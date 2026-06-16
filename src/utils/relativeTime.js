/**
 * Date 객체 또는 파싱 가능한 날짜 문자열을 받아 한국어 상대 시간 문자열로 반환.
 * 값이 없거나 파싱 불가능하면 원본 값을 그대로 반환.
 *
 * @param {Date|string|number} date
 * @returns {string}
 */
export function formatRelativeTime(date) {
  if (!date) return '';

  const target = date instanceof Date ? date : new Date(date);
  if (isNaN(target.getTime())) return String(date);

  const diff = Math.floor((Date.now() - target.getTime()) / 1000);
  const isFuture = diff < 0;
  const abs = Math.abs(diff);

  if (abs < 60) return '방금';

  let value;
  let unit;
  if (abs < 3600) {
    value = Math.floor(abs / 60);
    unit = '분';
  } else if (abs < 86400) {
    value = Math.floor(abs / 3600);
    unit = '시간';
  } else if (abs < 2592000) {
    value = Math.floor(abs / 86400);
    unit = '일';
  } else if (abs < 31536000) {
    value = Math.floor(abs / 2592000);
    unit = '개월';
  } else {
    value = Math.floor(abs / 31536000);
    unit = '년';
  }

  return `${value}${unit} ${isFuture ? '후' : '전'}`;
}
