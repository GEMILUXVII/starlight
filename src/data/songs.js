/**
 * 音乐数据 - 路径相对于 COS 存储桶根目录
 * 
 * 添加新歌曲时，请按以下格式添加：
 * {
 *   id: 唯一数字ID,
 *   title: '歌曲名',
 *   subtitle: '副标题/原唱',
 *   artist: '艺术家',
 *   date: 'YYYY-MM-DD',
 *   cover: '/covers/封面文件名.jpg',
 *   audio: '/audio/音频文件名.mp3',
 *   tags: ['标签1', '标签2']
 * }
 */
export const songs = [
  {
    id: 1,
    title: '红山果',
    subtitle: '安与骑兵',
    artist: '星瞳',
    date: '2025-01-25',
    cover: '/covers/红山果.jpg',
    audio: '/audio/红山果.mp3',
    tags: ['翻唱']
  },
  {
    id: 2,
    title: '我所有的夜有所梦里',
    subtitle: 'ZaZaZsu咂咂苏',
    artist: '星瞳',
    date: '2025-02-14',
    cover: '/covers/我所有的夜有所梦里.jpg',
    audio: '/audio/我所有的夜有所梦里.mp3',
    tags: ['翻唱']
  },
  {
    id: 3,
    title: '情歌',
    subtitle: '梁静茹',
    artist: '星瞳',
    date: '2023-02-22',
    cover: '/covers/情歌.jpg',
    audio: '/audio/情歌.mp3',
    tags: ['翻唱']
  },
  {
    id: 4,
    title: '成都',
    subtitle: '赵雷',
    artist: '星瞳',
    date: '2024-01-06',
    cover: '/covers/成都.jpg',
    audio: '/audio/成都.mp3',
    tags: ['翻唱']
  },
  {
    id: 5,
    title: '没那么简单',
    subtitle: '黄小琥',
    artist: '星瞳',
    date: '2024-01-09',
    cover: '/covers/没那么简单.jpg',
    audio: '/audio/没那么简单.mp3',
    tags: ['翻唱']
  },
  {
    id: 6,
    title: '不能说的秘密',
    subtitle: '周杰伦',
    artist: '星瞳',
    date: '2024-08-10',
    cover: '/covers/不能说的秘密.jpg',
    audio: '/audio/不能说的秘密.mp3',
    tags: ['翻唱']
  },
  {
    id: 7,
    title: '我只在乎你',
    subtitle: '邓丽君',
    artist: '星瞳',
    date: '2025-02-14',
    cover: '/covers/我只在乎你.jpg',
    audio: '/audio/我只在乎你.mp3',
    tags: ['翻唱']
  },
  {
    id: 8,
    title: '如果这就是爱情',
    subtitle: '张靓颖',
    artist: '星瞳',
    date: '2024-03-15',
    cover: '/covers/如果这就是爱情.jpg',
    audio: '/audio/如果这就是爱情.mp3',
    tags: ['翻唱']
  },
]
