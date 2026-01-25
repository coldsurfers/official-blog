import { breakpoints } from '@coldsurfers/ocean-road';
import { useCallback, useEffect, useState } from 'react';

type Pagination = {
  perLine: number;
  perPage: number;
};

export function usePostListPagination() {
  const calculate = useCallback<() => Pagination>(() => {
    if (document.documentElement.clientWidth <= breakpoints.medium) {
      return {
        perPage: 10,
        perLine: 2,
      };
    }
    return {
      perPage: 9,
      perLine: 3,
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
