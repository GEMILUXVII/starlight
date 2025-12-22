<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue'
import { OverlayScrollbars } from 'overlayscrollbars'
import 'overlayscrollbars/overlayscrollbars.css'

// Current visible year (for fixed display)
const currentYear = ref('')
const yearSections = ref([])
let observer = null

onMounted(() => {
  nextTick(() => {
    // Get all year section elements
    yearSections.value = document.querySelectorAll('[data-year]')
    
    // Create IntersectionObserver
    observer = new IntersectionObserver((entries) => {
      // Find the topmost visible section
      let topSection = null
      let topY = Infinity
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect
          if (rect.top < topY && rect.top < window.innerHeight * 0.5) {
            topY = rect.top
            topSection = entry.target
          }
        }
      })
      
      // Also check all sections to find which one is most visible at top
      yearSections.value.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 150 && rect.bottom > 150) {
          currentYear.value = section.dataset.year
        }
      })
    }, {
      threshold: [0, 0.1, 0.5],
      rootMargin: '-100px 0px -50% 0px'
    })
    
    // Observe all year sections
    yearSections.value.forEach(section => {
      observer.observe(section)
    })
    
    // Set initial year
    if (yearSections.value.length > 0) {
      currentYear.value = yearSections.value[0].dataset.year
    }
    
    // Initialize OverlayScrollbars on body
    OverlayScrollbars(document.body, {
      scrollbars: {
        theme: 'os-theme-star',
        autoHide: 'leave',
        autoHideDelay: 800
      }
    })
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  // Destroy OverlayScrollbars
  const osInstance = OverlayScrollbars(document.body)
  if (osInstance) {
    osInstance.destroy()
  }
})

// Accent color mapping for timeline dots
const accentColors = {
  rose: '#f472b6',
  violet: '#a78bfa',
  cyan: '#22d3ee',
  amber: '#fbbf24',
  blue: '#3b82f6',
  emerald: '#10b981',
  pink: '#ec4899',
  red: '#ef4444',
  orange: '#f97316',
  teal: '#14b8a6',
  purple: '#a855f7',
  sky: '#0ea5e9',
  yellow: '#eab308',
  green: '#22c55e',
  slate: '#64748b',
  gray: '#9ca3af'
}

const getAccentColor = (accent) => accentColors[accent] || '#ffffff'

const rawEvents = [
  // 2025
  { date: '2025-08-24', displayDate: '8月24日', title: '冰火夏梦季', desc: '在2025冰火夏梦季和雫るる一起表演歌曲《大展鸿图》。', accent: 'cyan' },
  { date: '2025-08-04', displayDate: '8月4日', title: '《虚环》新PV发布', desc: '星瞳_Official作为主要负责人，星瞳在当晚与工具人共同讲解、解析《虚环》。', accent: 'violet' },
  { date: '2025-08-02', displayDate: '8月2日', title: '绿洲四周年', desc: '星瞳“绿洲”四周年纪念直播顺利播出。', accent: 'emerald' },
  { date: '2025-07-04', displayDate: '7月4日', title: '百万粉丝达成', desc: 'B站粉丝数达到100万！🎉', accent: 'rose' },
  { date: '2025-06-27', displayDate: '6月27日', title: '第八届星斯卡', desc: '第八届星斯卡顺利开展，首次采用观众投票制。', accent: 'amber' },
  { date: '2025-06-09', displayDate: '6月9日', title: '3000舰达成', desc: '于演唱会感谢回中达成3000舰成就！', accent: 'rose' },
  { date: '2025-06-08', displayDate: '6月8日', title: '首场个人演唱会', desc: '星瞳首场演唱会——欢迎来到2568！于上海圆满落幕。', accent: 'rose' },
  { date: '2025-06-06', displayDate: '6月6日', title: '《SQUEEZE》发布', desc: '发布X.PGM《SQUEEZE》官方MV。', accent: 'violet' },
  { date: '2025-05-01', displayDate: '5月1日', title: '演唱会官宣', desc: '放出首场个人线下演唱会消息，定档6月8日。', accent: 'cyan' },
  { date: '2025-03-28', displayDate: '3月28日', title: '《瞳讯有约》第一期', desc: '和七海Nana7mi联动并推出《瞳讯有约》第一期——星辰大海。', accent: 'blue' },
  { date: '2025-03-07', displayDate: '3月7日', title: '《双影奇境》联动', desc: '和雪糕联动游戏《双影奇境》。', accent: 'teal' },
  { date: '2025-03-04', displayDate: '3月4日', title: '小师妹初亮相', desc: '新live2D小师妹初亮相！', accent: 'pink' },
  { date: '2025-03-01', displayDate: '3月1日', title: '小师妹新衣PV', desc: '发布新live2D小师妹新衣PV。', accent: 'pink' },
  { date: '2025-01-24', displayDate: '1月24日', title: '表演《APT.》', desc: '和雪糕在冰火歌会表演歌曲《APT.》。', accent: 'red' },
  { date: '2025-01-11', displayDate: '1月11日', title: '星瞳年货小卖部', desc: '新春直播带货。', accent: 'orange' },

  // 2024
  { date: '2024-09-15', displayDate: '9月15日', title: '虚环五人组首演', desc: '虚环5人组共同在「冰火歌会2024漫游季」表演歌曲《年轻的朋友来相会》。', accent: 'violet' },
  { date: '2024-09-13', displayDate: '9月13日', title: '原创专辑上线', desc: '与扇宝合作的原创专辑上线音乐平台。', accent: 'purple' },
  { date: '2024-07-13', displayDate: '7月13-14日', title: 'BML 2024', desc: '在BML现场表演歌曲《迷宫バタフライ》。', accent: 'blue' },
  { date: '2024-06-25', displayDate: '6月25日', title: '第六届星斯卡', desc: '第六届星斯卡颁奖礼。', accent: 'amber' },
  { date: '2024-06-09', displayDate: '6月9日', title: '暂停直播公告', desc: '星瞳暂停两周直播接受声带治疗。', accent: 'slate' },
  { date: '2024-05-31', displayDate: '5月31日', title: '3D衣服更新', desc: '3D衣服更新。', accent: 'cyan' },
  { date: '2024-03-07', displayDate: '3月7日', title: '直播1000天', desc: '星瞳直播1000天达成。', accent: 'rose' },
  { date: '2024-02-14', displayDate: '2月14日', title: '2D衣服更新', desc: '第三版2D衣服更新。', accent: 'pink' },
  { date: '2024-02-04', displayDate: '2月4日', title: '冰雪演唱会', desc: '参加完美世界TWINKLE.STAR五姐妹的【Twinkle.Star冰雪演唱会】。', accent: 'sky' },
  { date: '2024-02-03', displayDate: '2月3日', title: 'V光之夜获奖', desc: '荣获年度直播神回奖和年度行业开拓者奖。', accent: 'amber' },
  { date: '2024-01-26', displayDate: '1月26日', title: '第三次带货', desc: '第三次直播带货。', accent: 'orange' },
  { date: '2024-01-10', displayDate: '1月10日', title: '幻雨联动', desc: '与命运方舟新职业幻雨联动。', accent: 'blue' },

  // 2023
  { date: '2023-12-30', displayDate: '12月30日', title: '跨年3D直播', desc: '举行跨年3D直播。', accent: 'rose' },
  { date: '2023-12-25', displayDate: '12月25日', title: '我要上冰火', desc: '以评委的身份为选手打分。', accent: 'red' },
  { date: '2023-12-21', displayDate: '12月21日', title: '生死狙击2联动', desc: '星瞳与七海Nana7mi，阿梓从小就很可爱联动直播打生死狙击2。', accent: 'slate' },
  { date: '2023-12-15', displayDate: '12月15日', title: '第五届星斯卡', desc: '3D回直播第五届星斯卡。', accent: 'amber' },
  { date: '2023-11-24', displayDate: '11月24日', title: '黄金公爵', desc: '3D回直播星瞳多重宇宙黄金公爵。', accent: 'yellow' },
  { date: '2023-11-17', displayDate: '11月17日', title: '家用版1.0发布', desc: '3D回直播家用版星瞳1.0发布会。', accent: 'cyan' },
  { date: '2023-11-12', displayDate: '11月12日', title: '梦幻童话发售', desc: '个人收藏集【星瞳·梦幻童话】发售。', accent: 'pink' },
  { date: '2023-10-29', displayDate: '10月29日', title: '星·童话生日会', desc: '举办【星·童话丨与星瞳行】生日会，突破6000舰团。', accent: 'rose' },
  { date: '2023-10-28', displayDate: '10月28日', title: '扇宝生日会', desc: '出席扇宝的三周年纪念回。', accent: 'blue' },
  { date: '2023-10-04', displayDate: '10月4日', title: '冰火秋日游', desc: '与折原露露一起登上2023冰火秋日游。', accent: 'orange' },
  { date: '2023-09-16', displayDate: '9月16日', title: '猫邮杯评委', desc: '作为特邀评审团出席猫邮社举办的猫邮杯总决赛。', accent: 'slate' },
  { date: '2023-08-20', displayDate: '8月20日', title: '夏日狂想曲', desc: '扇宝、星瞳和安可共同发布夏日狂想曲收藏集。', accent: 'sky' },
  { date: '2023-08-17', displayDate: '8月17日', title: '七海联动直播', desc: '星瞳与七海Nana7mi联动直播打生死狙击2。', accent: 'blue' },
  { date: '2023-08-11', displayDate: '8月11日', title: '家用版内测', desc: '3D回直播家用版星瞳内测。', accent: 'cyan' },
  { date: '2023-07-30', displayDate: '7月30日', title: '二周年纪念', desc: '举行星·觉醒二周年纪念直播。', accent: 'violet' },
  { date: '2023-07-08', displayDate: '7月8日', title: 'DD配音回', desc: 'DD配音回第二回。', accent: 'emerald' },
  { date: '2023-07-04', displayDate: '7月4日', title: '看看校花', desc: '发布第三版2D形象《星瞳的新衣服！看看校花》。', accent: 'pink' },
  { date: '2023-06-30', displayDate: '6月30日', title: '第四届星斯卡', desc: '3D回直播第四届星斯卡。', accent: 'amber' },
  { date: '2023-06-17', displayDate: '6月17日', title: '白夜极光联动', desc: '白夜极光特别联动直播。', accent: 'blue' },
  { date: '2023-06-13', displayDate: '6月13日', title: 'CK带货', desc: '再次淘宝CK带货直播。', accent: 'orange' },
  { date: '2023-06-10', displayDate: '6月10日', title: '7小时QA', desc: 'CDD总经理光芒与小星星进行长达7小时的弹幕回复QA。', accent: 'slate' },
  { date: '2023-05-31', displayDate: '5月31日', title: '50万粉丝感谢', desc: '50w粉丝感谢信致五十万分之一的你。', accent: 'rose' },
  { date: '2023-05-27', displayDate: '5月27日', title: '星引力唱演SHOW', desc: '与王心凌跨次元联动。12个节目+12个工商，优势在瞳！', accent: 'rose' },
  { date: '2023-05-26', displayDate: '5月26日', title: '50万粉丝达成', desc: 'Bilibili粉丝数破五十万。', accent: 'rose' },
  { date: '2023-05-20', displayDate: '5月20日', title: '情侣头像发布', desc: '发布新的手绘情侣粉丝头像。', accent: 'pink' },
  { date: '2023-05-15', displayDate: '5月15日', title: '麦当劳推荐官', desc: '成为麦当劳520全国招聘周首席推荐官，参演歌曲《开心！新番茄》。', accent: 'red' },
  { date: '2023-05-13', displayDate: '5月13日', title: 'JDG应援', desc: '与汉莎航空一起为电竞俱乐部JDG送上比赛应援与祝福。小福星！', accent: 'blue' },
  { date: '2023-05-11', displayDate: '5月11日', title: '课代表采访', desc: 'UP主课代表立正发布超长采访《互联网公主星瞳·马的一天和一年》。', accent: 'amber' },
  { date: '2023-05-09', displayDate: '5月9日', title: '做客《未来可C》', desc: '星瞳聊虚拟偶像的科技向善和全新使命。', accent: 'blue' },
  { date: '2023-04-29', displayDate: '4月29日', title: '共献刀马旦', desc: '参与冰火歌会之冰火春日宴，联动兰音共献刀马旦。', accent: 'red' },
  { date: '2023-04-28', displayDate: '4月28日', title: '短信召唤', desc: '瞳的多重宇宙短信召唤小星星。', accent: 'violet' },
  { date: '2023-04-27', displayDate: '4月27日', title: '数字中国峰会', desc: '出展第六届数字中国建设峰会腾讯云展台。', accent: 'blue' },
  { date: '2023-04-24', displayDate: '4月24日', title: 'VR四周年联动', desc: 'VR四周年联动。', accent: 'cyan' },
  { date: '2023-04-14', displayDate: '4月14日', title: '第二次带货', desc: '能买4090的深月春日集市。', accent: 'orange' },
  { date: '2023-04-04', displayDate: '4月4日', title: 'QQ装扮发售', desc: 'QQ装扮正式发售！', accent: 'pink' },
  { date: '2023-03-31', displayDate: '3月31日', title: '国风新衣回', desc: '再次与敦煌伽瑶联动。', accent: 'emerald' },
  { date: '2023-03-25', displayDate: '3月25日', title: 'Live2D一周年', desc: 'Live2D直播一周年。', accent: 'rose' },
  { date: '2023-03-13', displayDate: '3月13日', title: '深月电台返场', desc: 'FM 25.68 深月电台返场，启动！', accent: 'purple' },
  { date: '2023-03-08', displayDate: '3月8日', title: '《给女孩》', desc: '手绘+翻唱李宇春的《给女孩》。', accent: 'pink' },
  { date: '2023-02-17', displayDate: '2月17日', title: '最长耐久直播', desc: '耐久直播游戏《隐形守护者》。', accent: 'slate' },
  { date: '2023-02-14', displayDate: '2月14日', title: '情人节回', desc: '解锁新场所深月列车，新装备轮滑鞋。赛博爱情感动众人。', accent: 'rose' },
  { date: '2023-02-09', displayDate: '2月9日', title: '虚拟人影响力之一', desc: '拿下中国虚拟数字人影响力指数人气榜虚拟偶像赛道第一名。', accent: 'amber' },
  { date: '2023-02-05', displayDate: '2月5日', title: '《我们的时代》', desc: '合作曲《我们的时代》发布。', accent: 'blue' },
  { date: '2023-01-27', displayDate: '1月27日', title: '36→46', desc: '工具人发文36→46，疑似新增动捕摄像头。', accent: 'gray' },
  { date: '2023-01-20', displayDate: '1月20日', title: '百度地图语音包', desc: '百度地图的星瞳联动语音包上线。', accent: 'blue' },
  { date: '2023-01-14', displayDate: '1月14日', title: '年度虚拟UP主', desc: '获得2022年度虚拟UP主荣誉。', accent: 'amber' },
  { date: '2023-01-08', displayDate: '1月8日', title: '超新星歌会', desc: '参加微博的《超新星歌会》活动。', accent: 'orange' },
  { date: '2023-01-06', displayDate: '1月6日', title: '虚拟星推官', desc: '担任重庆文旅虚拟星推官。', accent: 'cyan' },
  { date: '2023-01-05', displayDate: '1月5日', title: '首次带货', desc: '星瞳首次尝试直播带货。', accent: 'orange' },

  // 2022
  { date: '2022-12-30', displayDate: '12月30日', title: '【星月夜】', desc: '3D回直播【星月夜】星什么？？21天速成UE5舞台剧。', accent: 'violet' },
  { date: '2022-12-22', displayDate: '12月22日', title: '伽瑶联动', desc: '出现在敦煌仙子伽瑶直播间进行互动。', accent: 'emerald' },
  { date: '2022-12-20', displayDate: '12月20日', title: '二期装扮发售', desc: '星瞳二期装扮发售。', accent: 'pink' },
  { date: '2022-12-19', displayDate: '12月19日', title: 'CDD虚拟制作总结', desc: 'CDD官号发布CDD虚拟制作2022总结。', accent: 'slate' },
  { date: '2022-12-16', displayDate: '12月16日', title: '第三届星斯卡', desc: '3D回直播第三届星斯卡。', accent: 'amber' },
  { date: '2022-11-19', displayDate: '11月19日', title: '30w收听', desc: '《星·引力》专辑首周突破30w收听。', accent: 'rose' },
  { date: '2022-11-18', displayDate: '11月18日', title: 'VMV音乐榜', desc: '作为嘉宾与七海一起参加《VMV音乐榜 第51期》。', accent: 'blue' },
  { date: '2022-11-05', displayDate: '11月5日', title: '【NEW ME】生日会', desc: '举行【NEW ME】生日会。', accent: 'rose' },
  { date: '2022-11-04', displayDate: '11月4日', title: '《星·引力》上线', desc: '首张迷你专辑上线；投稿单曲《瞳》MV。', accent: 'violet' },
  { date: '2022-10-28', displayDate: '10月28日', title: '沐霂生日会', desc: '参加沐霂“About Me演唱会”主题生日会。', accent: 'emerald' },
  { date: '2022-10-09', displayDate: '10月9日', title: '40万粉丝达成', desc: 'Bilibili粉丝数破四十万。', accent: 'rose' },
  { date: '2022-10-02', displayDate: '10月2日', title: '冰火秋日之心', desc: '参与冰火歌会之冰火秋日游，获得称号。', accent: 'orange' },
  { date: '2022-08-08', displayDate: '8月8日', title: 'UE5升级公告', desc: '工具人发布公告，企划正式向UE5技术升级。', accent: 'blue' },
  { date: '2022-07-31', displayDate: '7月31日', title: '4000舰达成', desc: '直播一周年，获得了超4000舰团的成就。', accent: 'rose' },
  { date: '2022-07-16', displayDate: '7月16日', title: '冰火夏日夜', desc: '参加冰火歌会之冰火夏日夜。', accent: 'red' },
  { date: '2022-06-30', displayDate: '6月30日', title: '恬豆生日会', desc: '参加恬豆生日会。', accent: 'green' },
  { date: '2022-06-27', displayDate: '6月27日', title: '中传毕设展', desc: '主持中国传媒大学动画与数字艺术学院毕业设计展。', accent: 'slate' },
  { date: '2022-06-01', displayDate: '6月1日', title: '评论区营业', desc: '开启动态评论区营业。', accent: 'blue' },
  { date: '2022-05-30', displayDate: '5月30日', title: '守护国宝行动', desc: '星瞳联合洛阳博物馆等发布视频《如果文物会跳舞！》。', accent: 'emerald' },
  { date: '2022-05-28', displayDate: '5月28日', title: '30万粉丝达成', desc: 'Bilibili粉丝数破三十万。', accent: 'rose' },
  { date: '2022-05-26', displayDate: '5月26日', title: '《花舞星妙夜》', desc: '星瞳和孟庆旸合作舞蹈节目正式上线。', accent: 'pink' },
  { date: '2022-05-21', displayDate: '5月21日', title: '《花宸令》', desc: '发布QQ炫舞14周年主题曲《花宸令》。', accent: 'rose' },
  { date: '2022-05-13', displayDate: '5月13日', title: 'CK带货', desc: '淘宝CK带货直播，与宵宵再次合作。', accent: 'orange' },
  { date: '2022-05-07', displayDate: '5月7日', title: '绝对音准', desc: '2D直播首次演奏葫芦丝，透露绝对音准。', accent: 'green' },
  { date: '2022-05-05', displayDate: '5月5日', title: '燃力士代言', desc: '星瞳担任燃力士形象代言人。', accent: 'red' },
  { date: '2022-05-04', displayDate: '5月4日', title: '央视特别节目', desc: '星瞳参加央视五四青年节特别节目。', accent: 'red' },
  { date: '2022-04-21', displayDate: '4月21日', title: '星瞳装扮', desc: '星瞳装扮发售。', accent: 'pink' },
  { date: '2022-04-10', displayDate: '4月10日', title: '20万粉二创赛', desc: '星瞳20万粉纪念二创征集大赛开启。', accent: 'rose' },
  { date: '2022-04-08', displayDate: '4月8日', title: 'UE4测试回', desc: 'UE4技术测试回。', accent: 'blue' },
  { date: '2022-04-07', displayDate: '4月7日', title: '洛阳星推官', desc: '星瞳官宣担任洛阳文旅星推官。', accent: 'cyan' },
  { date: '2022-04-01', displayDate: '4月1日', title: '重返千舰', desc: '首次与扇宝正式联动，Bilibili粉丝数破20万，重返千舰。', accent: 'rose' },
  { date: '2022-03-27', displayDate: '3月27日', title: 'UE5测试', desc: '发布UE5测试视频。', accent: 'blue' },
  { date: '2022-03-25', displayDate: '3月25日', title: 'Live2D初见', desc: '星瞳Live2D初见，众v送上祝福。', accent: 'pink' },
  { date: '2022-03-21', displayDate: '3月21日', title: 'V萌冠军', desc: '在百度帖吧V吧活动中获得V萌冠军。', accent: 'amber' },
  { date: '2022-03-04', displayDate: '3月4日', title: '居家电台会', desc: '因为疫情原因，首次居家电台会。', accent: 'slate' },
  { date: '2022-02-07', displayDate: '2月7日', title: '百万播放', desc: '星瞳与花样滑冰世界冠军联动视频播放量到达100万。', accent: 'rose' },
  { date: '2022-02-06', displayDate: '2月6日', title: '出演《少年》', desc: '与冰糖合作出演其百万粉纪念MV《少年》。', accent: 'blue' },
  { date: '2022-01-28', displayDate: '1月28日', title: '星瞳春晚', desc: '星瞳线上春节联欢晚会。', accent: 'red' },
  { date: '2022-01-13', displayDate: '1月13日', title: '花滑冠军联动', desc: '星瞳联动花样滑冰世界冠军庞清、佟健。', accent: 'cyan' },

  // 2021
  { date: '2021-12-30', displayDate: '12月30日', title: '1500舰达成', desc: '以“星星的夜”为主题进行跨年直播。并于当晚突破1500舰。', accent: 'rose' },
  { date: '2021-12-26', displayDate: '12月26日', title: '星斯卡评选', desc: '在家中进行“星斯卡”年度评选直播。', accent: 'amber' },
  { date: '2021-12-18', displayDate: '12月18日', title: 'propnight', desc: '在家中进行水友游戏回。', accent: 'red' },
  { date: '2021-12-10', displayDate: '12月10日', title: '云之彼端', desc: '在下雪后的云之彼端进行直播。', accent: 'cyan' },
  { date: '2021-12-04', displayDate: '12月4日', title: '配音回', desc: '在家中cosplay懒狗进行配音回直播。', accent: 'slate' },
  { date: '2021-12-03', displayDate: '12月3日', title: '《HEA!狮舞》', desc: '发布与Yamy郭颖合作单曲《HEA!狮舞》。', accent: 'red' },
  { date: '2021-11-27', displayDate: '11月27日', title: '舞力全开', desc: '在家中使用Nintendo Switch进行《舞力全开》游戏回。', accent: 'pink' },
  { date: '2021-11-20', displayDate: '11月20日', title: '怀旧回', desc: '在练舞室进行怀旧回歌舞直播。', accent: 'violet' },
  { date: '2021-11-13', displayDate: '11月13日', title: '旅行的意义', desc: '在云之彼端进行直播，讲述旅行的意义。', accent: 'sky' },
  { date: '2021-11-09', displayDate: '11月9日', title: '开始周播', desc: '进行游戏回直播《INSIDE》，并自此开始周播。', accent: 'slate' },
  { date: '2021-10-24', displayDate: '10月24日', title: '24小时直播', desc: '生日直播进行了时长24小时。', accent: 'rose' },
  { date: '2021-10-23', displayDate: '10月23日', title: '10万粉丝达成', desc: 'Bilibili粉丝数突破10万。', accent: 'rose' },
  { date: '2021-10-22', displayDate: '10月22日', title: '《2060》', desc: '成为江苏卫视虚拟偶像选秀节目《2060》的参赛选手。', accent: 'blue' },
  { date: '2021-09-23', displayDate: '9月23日', title: '苏菲合作', desc: '与苏菲品牌合作，推出限摩登定款卫生巾。', accent: 'pink' },
  { date: '2021-09-17', displayDate: '9月17日', title: '中秋赏月', desc: '跳了《燕无歇》的原创编舞版。', accent: 'yellow' },
  { date: '2021-09-11', displayDate: '9月11日', title: '百舰达成', desc: '在星♀瞳♀妙♀妙♀屋直播，达成百舰成就。', accent: 'rose' },
  { date: '2021-08-28', displayDate: '8月28日', title: '你好，同桌', desc: '以“你好，同桌”为主题展开直播。', accent: 'green' },
  { date: '2021-08-14', displayDate: '8月14日', title: '七夕直播', desc: '在b站进行了七夕限定直播。', accent: 'pink' },
  { date: '2021-08-12', displayDate: '8月12日', title: 'NEW STAR MV', desc: '《NEW STAR》MV发布。', accent: 'blue' },
  { date: '2021-07-31', displayDate: '7月31日', title: '第二次直播', desc: '进行了第二次b站直播。', accent: 'violet' },
  { date: '2021-07-23', displayDate: '7月23日', title: '《NEW STAR》', desc: '携手张欣尧献唱主题曲。', accent: 'blue' },
  { date: '2021-07-19', displayDate: '7月19日', title: '幻妆计划', desc: '和天猫同好派跟天猫彩妆周共同发起幻妆计划。', accent: 'red' },
  { date: '2021-06-11', displayDate: '6月11日', title: 'B站首次直播', desc: '与欣小萌合作，迎来了b站的首次直播。', accent: 'rose' },
  { date: '2021-05-23', displayDate: '5月23日', title: '灯光秀延期', desc: '长沙舞蹈灯光秀因暴雨延期。', accent: 'slate' },
  { date: '2021-05-16', displayDate: '5月16日', title: '非遗文旅大使', desc: '星瞳正式成为长沙首位虚拟非遗文旅推广大使。', accent: 'orange' },
  { date: '2021-03-14', displayDate: '3月14日', title: '《情人》翻跳', desc: '发布蔡徐坤演唱的《情人》翻跳舞蹈视频。', accent: 'pink' },
  { date: '2021-02-04', displayDate: '2月4日', title: '小年yeah', desc: '登上哔哩哔哩小年yeah的舞台。', accent: 'red' },
  { date: '2021-02-01', displayDate: '2月1日', title: 'B站首秀', desc: '开始以vup形象进行活动，发布第一条b站动态。', accent: 'rose' }
]

const eventsByYear = computed(() => {
  const groups = {}
  rawEvents.forEach(event => {
    const year = event.date.split('-')[0]
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(event)
  })
  return Object.keys(groups).sort((a, b) => b - a).map(year => ({
    year,
    events: groups[year]
  }))
})
</script>

<template>
    <div class="relative max-w-5xl mx-auto px-4">
      <!-- Fixed Year Display -->
      <div class="fixed left-4 md:left-[calc(50%-32rem)] top-32 z-40 pointer-events-none">
        <span class="text-6xl md:text-8xl font-black text-white/35 select-none tracking-tighter vertical-text drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300">
          {{ currentYear }}
        </span>
      </div>

      <!-- Minimalist Center Line -->
      <div class="absolute left-6 md:left-1/2 top-12 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2"></div>

      <div v-for="group in eventsByYear" :key="group.year" :data-year="group.year" class="relative group/year pb-20">

        <div class="space-y-16">
          <div 
            v-for="(item, index) in group.events" 
            :key="index"
            class="timeline-row flex flex-col md:flex-row items-baseline w-full group relative"
            :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
          >
            <!-- Content Side (45%) -->
            <div class="w-full pl-24 md:pl-0 md:w-[45%] md:px-12 relative z-20">
              <div 
                class="relative transition-all duration-500 group-hover:-translate-y-1"
                :style="{ animationDelay: `${index * 0.05}s` }"
                :class="index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'"
              >
                <!-- Date -->
                <div class="flex items-center gap-3 mb-2 transition-opacity duration-300">
                  <span 
                    class="text-xs font-black font-mono tracking-widest uppercase px-3 py-1.5 rounded-md border backdrop-blur-md shadow-lg"
                    :style="{ 
                      backgroundColor: 'rgba(0,0,0,0.85)', 
                      borderColor: getAccentColor(item.accent),
                      color: getAccentColor(item.accent),
                      boxShadow: `0 0 10px ${getAccentColor(item.accent)}40`
                    }"
                  >
                    {{ item.displayDate }}
                  </span>
                  <div class="h-px w-12 bg-black/50 shadow-[0_0_2px_rgba(255,255,255,0.5)]"></div>
                </div>

                <!-- Title -->
                <h3 class="text-3xl font-bold text-white/90 mb-3 tracking-wide leading-tight group-hover:text-white transition-colors duration-300 text-shadow-sm">
                  {{ item.title }}
                </h3>

                <!-- Desc -->
                <p class="text-base text-white/70 font-normal leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {{ item.desc }}
                </p>
              </div>
            </div>

            <!-- Axis Dot -->
            <div class="absolute left-6 md:left-1/2 w-3 h-3 md:-translate-x-1/2 top-2 flex items-center justify-center">
              <div 
                class="w-1.5 h-1.5 rounded-full transition-all duration-500 group-hover:scale-[2] group-hover:shadow-[0_0_15px_currentColor]"
                :style="{ backgroundColor: getAccentColor(item.accent), color: getAccentColor(item.accent) }"
              ></div>
              <!-- Pulse ring -->
              <div 
                class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 group-hover:scale-[4] transition-all duration-700"
                :style="{ backgroundColor: getAccentColor(item.accent) }"
              ></div>
            </div>

            <!-- Empty Side -->
            <div class="hidden md:block md:w-[45%]"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Minimal Footer -->
    <footer class="mt-40 pt-12 border-t border-white/5 text-center text-xs text-white/20 uppercase tracking-[0.2em] font-light">
      <p class="hover:text-white/40 transition-colors cursor-default">
        Inspired by Starlight
      </p>
    </footer>
</template>

<style scoped>
/* Organic Fade In Animations */
.animate-fade-in-left {
  animation: fadeInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

.animate-fade-in-right {
  animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
}

@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.text-shadow-sm {
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
}
</style>

<style>
/* Custom Star Theme for OverlayScrollbars */
.os-theme-star {
  --os-handle-bg: transparent;
  --os-handle-bg-hover: transparent;
  --os-handle-bg-active: transparent;
}

.os-theme-star .os-scrollbar-handle {
  background: transparent !important;
  position: relative;
}

.os-theme-star .os-scrollbar-handle::before {
  content: '✦';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: rgba(244, 114, 182, 0.6);
  text-shadow: 0 0 8px rgba(244, 114, 182, 0.4);
  transition: all 0.3s ease;
}

.os-theme-star .os-scrollbar-handle:hover::before {
  color: #f472b6;
  text-shadow: 0 0 15px rgba(244, 114, 182, 0.8);
  font-size: 20px;
}

.os-theme-star .os-scrollbar-track {
  background: transparent !important;
}

.os-theme-star.os-scrollbar-vertical {
  width: 20px;
}
</style>
