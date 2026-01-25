import { match } from 'ts-pattern';
import type { SeriesCategory } from './models/series';

export const generateSeriesHref = ({
  seriesCategory,
  query,
}: {
  seriesCategory?: SeriesCategory;
  query?: { page: number };
}): string => {
  let url = '';

  if (seriesCategory) {
    url = `/${seriesCategory}`;
  }

  if (query?.page) {
    return `${url}/page/${query.page}`;
  }

  return url;
};

export const generateSeriesItemHref = (seriesCategory: SeriesCategory, slug: string) => {
  return {
    pathname: `/${seriesCategory}/${slug}`,
    params: {
      series: seriesCategory,
      slug,
    },
  };
};

export const convertSeriesCategoryToTitle = (seriesCategory: SeriesCategory) => {
  return match(seriesCategory)
    .with('news', () => 'COLDSURF BLOG: NEWS')
    .with('culture', () => 'COLDSURF BLOG: CULTURE')
    .with('voice', () => 'COLDSURF BLOG: VOICE')
    .otherwise(() => '');
};
