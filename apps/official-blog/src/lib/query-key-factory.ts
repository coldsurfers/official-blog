import { createQueryKeys, mergeQueryKeys } from '@lukemorales/query-key-factory';
import { fetchSeries, fetchSeriesItem, fetchTags, fetchUsers } from './fetchers';
import type { AppLocale } from './models/app-locale';
import {
  AllSeriesCategories,
  type FetchGetSeriesItemSearchParams,
  type FetchGetSeriesSearchParams,
} from './models/series';

const series = createQueryKeys('series', {
  all: ['series'],
  listAll: (appLocale: AppLocale, tag?: string) => ({
    queryKey: ['series', 'listAll', { appLocale, tag }],
    queryFn: async () => {
      const promises = AllSeriesCategories.map(async (seriesCategory) => {
        return await fetchSeries({
          seriesCategory,
          appLocale,
          tag,
        });
      });
      const response = await Promise.all(promises);
      return response;
    },
  }),
  list: (params: FetchGetSeriesSearchParams) => ({
    queryKey: ['series', 'list', params],
    queryFn: () => fetchSeries(params),
  }),
  item: (slug: string, searchParams: FetchGetSeriesItemSearchParams) => ({
    queryKey: ['series', 'detail', { slug, ...searchParams }],
    queryFn: () => fetchSeriesItem(slug, searchParams),
  }),
});

const users = createQueryKeys('users', {
  all: null,
  list: {
    queryKey: ['list'],
    queryFn: () => fetchUsers(),
  },
});

const tags = createQueryKeys('tags', {
  all: null,
  list: () => ({
    queryKey: ['list'],
    queryFn: () => fetchTags(),
  }),
});

export const queryKeyFactory = mergeQueryKeys(users, series, tags);
