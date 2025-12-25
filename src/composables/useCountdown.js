/**
 * 倒计时逻辑 Composable
 * 统一处理事件倒计时计算，避免重复代码
 */

/**
 * 获取下一个目标日期
 * 如果今年的日期已过，返回明年的日期
 */
export function getNextTargetDate(month, day) {
  const now = new Date()
  const currentYear = now.getFullYear()
  let targetDate = new Date(currentYear, month - 1, day, 0, 0, 0, 0)
  if (now > targetDate) {
    targetDate = new Date(currentYear + 1, month - 1, day, 0, 0, 0, 0)
  }
  return targetDate
}

/**
 * 获取基础倒计时信息（仅天数）
 * @param {Object} event - 事件对象，包含 month 和 day
 * @returns {{ days: number, isToday: boolean }}
 */
export function getCountdown(event) {
  const targetDate = getNextTargetDate(event.month, event.day)
  const now = new Date()
  const diff = targetDate - now

  if (diff <= 0) {
    return { days: 0, isToday: true }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    isToday: false
  }
}

/**
 * 获取完整倒计时信息（天、时、分）
 * @param {Object} event - 事件对象，包含 month 和 day
 * @returns {{ days: number, hours: number, minutes: number, isToday: boolean, targetDate: Date }}
 */
export function getFullCountdown(event) {
  const targetDate = getNextTargetDate(event.month, event.day)
  const now = new Date()
  const diff = targetDate - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isToday: true, targetDate }
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    isToday: false,
    targetDate
  }
}

/**
 * 获取事件显示标题
 * 对于周年事件，显示 "X周年" 格式
 * @param {Object} event - 事件对象
 * @returns {string}
 */
export function getDisplayTitle(event) {
  if (event.showYears && event.year) {
    const targetDate = getNextTargetDate(event.month, event.day)
    return `${targetDate.getFullYear() - event.year}周年`
  }
  return event.title
}
