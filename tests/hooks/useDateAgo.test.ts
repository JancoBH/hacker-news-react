import { useDateAgo } from '../../src/hooks';
import { renderHook } from '@testing-library/react';

const intervals = {
  'year': 31536000,
  'month': 2592000,
  'week': 604800,
  'day': 86400,
  'hour': 3600,
  'minute': 60,
  'second': 1
};

describe('useDateAgo', () => {

  it('should return "Right now" when less than 30 seconds ago', () => {
    const { result } = renderHook(() => useDateAgo(new Date().toISOString()));
    expect(result.current).toBe('Right now');
  });

  it('should return "1 day ago" when less than 1 day ago', () => {
    const { result } = renderHook(() => useDateAgo(new Date(Date.now() - intervals.day * 1000).toISOString()));
    expect(result.current).toBe('1 day ago');
  });

  it('should return "2 years ago" when less than 2 years ago', () => {
    const { result } = renderHook(() => useDateAgo(new Date(Date.now() - (intervals.year * 1000) * 2).toISOString()));
    expect(result.current).toBe('2 years ago');
  });

});
