import { describe, expect, it } from 'vitest';
import {
  calculateDuration,
  formatDuration,
  getPeriodDuration,
} from './duration';

describe('duration utilities', () => {
  it('calculates months including the start month', () => {
    const result = calculateDuration('2024.01', '2024.03');

    expect(result).toEqual({
      years: 0,
      months: 3,
      totalMonths: 3,
    });
  });

  it('formats localized duration strings', () => {
    expect(formatDuration({ years: 2, months: 5, totalMonths: 29 }, 'ko')).toBe(
      '2년 5개월'
    );
    expect(formatDuration({ years: 1, months: 1, totalMonths: 13 }, 'en')).toBe(
      '1 year 1 month'
    );
  });

  it('handles branch cases for ko and en duration formatting', () => {
    expect(formatDuration({ years: 0, months: 5, totalMonths: 5 }, 'ko')).toBe(
      '5개월'
    );
    expect(formatDuration({ years: 2, months: 0, totalMonths: 24 }, 'ko')).toBe(
      '2년'
    );
    expect(formatDuration({ years: 0, months: 1, totalMonths: 1 }, 'en')).toBe(
      '1 month'
    );
    expect(formatDuration({ years: 1, months: 0, totalMonths: 12 }, 'en')).toBe(
      '1 year'
    );
  });

  it('parses a closed period string', () => {
    expect(getPeriodDuration('2023.09 - 2026.02')).toEqual({
      years: 2,
      months: 6,
      totalMonths: 30,
    });
  });

  it('treats an open-ended period as running until today', () => {
    const total = getPeriodDuration('2026.07 - 현재');

    expect(total.totalMonths).toBeGreaterThan(0);
  });
});
