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
    artist: '安与骑兵',
    date: '2025-01-25',
    cover: '/covers/红山果.jpg',
    audio: '/audio/红山果.mp3',
    tags: ['翻唱']
  },
  {
    id: 2,
    title: '我所有的夜有所梦里',
    subtitle: '就是怦然心动',
    artist: 'ZaZaZsu咂咂苏',
    date: '2025-02-14',
    cover: '/covers/我所有的夜有所梦里.jpg',
    audio: '/audio/我所有的夜有所梦里.mp3',
    tags: ['翻唱']
  },
]
