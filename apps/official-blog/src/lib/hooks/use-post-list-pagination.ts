import { breakpoints } from '@coldsurfers/ocean-road';
import { useCallback, useEffect, useState } from 'react';
import { PAGINATION_PER_LINE, PAGINATION_PER_PAGE } from '../constants';

type Pagination = {
  perLine: number;
  perPage: number;
};

export function usePostListPagination() {
  const calculate = useCallback<() => Pagination>(() => {
    if (document.documentElement.clientWidth <= breakpoints.medium) {
      return {
        perPage: PAGINATION_PER_PAGE,
        perLine: PAGINATION_PER_LINE.MEDIUM,
      };
    }
    if (document.documentElement.clientWidth <= breakpoints.large) {
      return {
        perPage: PAGINATION_PER_PAGE,
        perLine: PAGINATION_PER_LINE.LARGE,
      };
    }
    return {
      perPage: PAGINATION_PER_PAGE,
      perLine: PAGINATION_PER_LINE.DEFAULT,
    };
  }, []);

  const [pagination, setPagination] = useState<Pagination>(calculate());

  useEffect(() => {
    function onResize() {
      setPagination(calculate());
    }

    window.addEventListener('resize', onResize);

    onResize();

    return () => window.removeEventListener('resize', onResize);
  }, [calculate]);

  return pagination;
}
