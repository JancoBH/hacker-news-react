import { usePagination } from '../../src/hooks';
import { renderHook } from '@testing-library/react';

describe('usePagination', () => {

  it('should return just 1 page', () => {
    const range = renderHook( () => usePagination({
      totalCount: 1,
      pageSize: 1,
      siblingCount: 1,
      currentPage: 1
    })).result.current;
    expect(range).toEqual([1]);
  });

  it('should return the 2 pages range', () => {
    const range = renderHook( () => usePagination({
      totalCount: 12,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 1
    })).result.current;
    expect(range).toEqual([1, 2]);
  });

  it('should return the 10 pages range with right dots', () => {
    const range = renderHook( () => usePagination({
      totalCount: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 1
    })).result.current;
    expect(range).toEqual([1, 2, 3, 4, 5, '...', 10]);
  });

  it('should return the 10 pages range with left dots', () => {
    const range = renderHook( () => usePagination({
      totalCount: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 10
    })).result.current;
    expect(range).toEqual([1, '...', 6, 7, 8, 9, 10]);
  });

  it('should return the 10 pages with page 5 selected and left & right dots', () => {
    const range = renderHook( () => usePagination({
      totalCount: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 5
    })).result.current;
    expect(range).toEqual([1, '...', 4, 5, 6, '...', 10]);
  });

});
