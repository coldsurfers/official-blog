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
