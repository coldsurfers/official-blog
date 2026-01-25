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

export const seriesUtils = {
  category: {
    getHeaderHrefData: ({
      seriesParam,
    }: { seriesParam: string }): {
      href: string;
      title: string;
      isActive: boolean;
    }[] => {
      return [
        { href: '/news', title: 'NEWS', isActive: seriesParam === 'news' },
        { href: '/culture', title: 'CULTURE', isActive: seriesParam === 'culture' },
        { href: '/voice', title: 'VOICE', isActive: seriesParam === 'voice' },
        { href: '/tech', title: 'TECH', isActive: seriesParam === 'tech' },
      ];
    },
    getMeta: (series: SeriesCategory) => {
      return {
        title: match(series)
          .with('news', () => 'COLDSURF Blog: NEWS')
          .with('culture', () => 'COLDSURF Blog: CULTURE')
          .with('voice', () => 'COLDSURF Blog: VOICE')
          .with('tech', () => 'COLDSURF Blog: TECH')
          .exhaustive(),
        description: match(series)
          .with('news', () => 'Article about news')
          .with('culture', () => 'Article about culture')
          .with('voice', () => `Article about editor's note`)
          .with('tech', () => 'Article about tech')
          .exhaustive(),
      };
    },
    convertSeriesCategoryToTitle: (seriesCategory: SeriesCategory) => {
      return match(seriesCategory)
        .with('news', () => 'COLDSURF BLOG: NEWS')
        .with('culture', () => 'COLDSURF BLOG: CULTURE')
        .with('voice', () => 'COLDSURF BLOG: VOICE')
        .with('tech', () => 'COLDSURF BLOG: TECH')
        .exhaustive();
    },
  },
};
