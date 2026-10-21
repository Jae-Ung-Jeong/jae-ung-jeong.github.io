/**
 * day.js를 사용한 기간 계산 유틸리티
 */
import dayjs from 'dayjs';

export interface DurationResult {
  years: number;
  months: number;
  totalMonths: number;
}

/**
 * 두 날짜 사이의 기간을 계산합니다.
 * @param startDate - 시작일 (YYYY.MM 또는 YYYY-MM 형식)
 * @param endDate - 종료일 (YYYY.MM 또는 YYYY-MM 형식, 없으면 현재 날짜)
 */
export function calculateDuration(
  startDate: string,
  endDate?: string
): DurationResult {
  // YYYY.MM 형식을 YYYY-MM-01 형식으로 변환
  const normalizeDate = (dateStr: string): string => {
    const normalized = dateStr.replace('.', '-');
    return `${normalized}-01`;
  };

  const start = dayjs(normalizeDate(startDate));
  const end = endDate ? dayjs(normalizeDate(endDate)) : dayjs();

  // 총 개월 수 계산 (시작 월 포함)
  const totalMonths = end.diff(start, 'month') + 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return { years, months, totalMonths };
}

/**
 * 기간을 한국어 문자열로 포맷합니다.
 */
export function formatDurationKo(duration: DurationResult): string {
  const { years, months } = duration;

  if (years === 0) {
    return `${months}개월`;
  }

  if (months === 0) {
    return `${years}년`;
  }

  return `${years}년 ${months}개월`;
}

/**
 * 기간을 영어 문자열로 포맷합니다.
 */
export function formatDurationEn(duration: DurationResult): string {
  const { years, months } = duration;

  const yearStr = years === 1 ? '1 year' : `${years} years`;
  const monthStr = months === 1 ? '1 month' : `${months} months`;

  if (years === 0) {
    return monthStr;
  }

  if (months === 0) {
    return yearStr;
  }

  return `${yearStr} ${monthStr}`;
}

/**
 * 기간을 로케일에 맞게 포맷합니다.
 */
export function formatDuration(
  duration: DurationResult,
  locale: string
): string {
  return locale === 'ko'
    ? formatDurationKo(duration)
    : formatDurationEn(duration);
}

/**
 * "2026.07 - 2026.12" 형식의 기간 문자열을 계산합니다.
 * 종료일이 없거나 "현재"/"Present"면 오늘까지로 계산합니다.
 */
export function getPeriodDuration(period: string): DurationResult {
  const [start, end] = period.split('-').map((part) => part.trim());
  const endDate = end && /^\d{4}\.\d{2}$/.test(end) ? end : undefined;
  return calculateDuration(start, endDate);
}
