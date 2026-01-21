import type {
  PageObjectResponse,
  PersonUserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { ExtendedRecordMap } from 'notion-types';
import { cache } from 'react';
import { PAGINATION_PER_PAGE } from './constants';
import { META_SITE_URL } from './metadata';
import {
  AllSeriesCategories,
  type FetchGetSeriesItemSearchParams,
  type FetchGetSeriesSearchParams,
  type SeriesItem,
  SeriesItemSchema,
} from './models/series';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : META_SITE_URL;

export const fetchSeries = cache(
  async (
    params: FetchGetSeriesSearchParams
  ): Promise<{
    postItems: SeriesItem[];
    totalPage: number;
  }> => {
    try {
      const { seriesCategory, tag } = params;
      const searchParams = new URLSearchParams();
      searchParams.set('seriesCategory', seriesCategory);
      //   default korean
      searchParams.set('appLocale', 'ko');
      if (tag) {
        searchParams.set('tag', tag);
      }
      const url = `${BASE_URL}/api/series?${searchParams.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
      });
      const json = await response.json();
      const validation = SeriesItemSchema.array().safeParse(json);
      if (!validation.success) {
        console.error('fetch error, fetchGetSeries', params, validation.error);
        return {
          postItems: [],
          totalPage: 0,
        };
      }
      const { data } = validation;
      return {
        postItems: data.sort(
          (a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
        ),
        totalPage: Math.ceil(data.length / PAGINATION_PER_PAGE),
      };
    } catch (e) {
      console.error(e);
      return {
        postItems: [],
        totalPage: 0,
      };
    }
  }
);

export const fetchSeriesList = cache(async ({ tag }: { tag?: string }) => {
  const promises = AllSeriesCategories.map(async (seriesCategory) => {
    return await fetchSeries({
      seriesCategory,
      appLocale: 'ko',
      tag,
    });
  });
  const response = await Promise.all(promises);
  const allPostItems = response
    .flatMap((value) => value.postItems)
    .filter((value) => value !== null)
    .sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
  return {
    allPostItems,
    totalPage: Math.ceil(allPostItems.length / PAGINATION_PER_PAGE),
  };
});

export const fetchSeriesItem = async (
  slug: string,
  searchParams: FetchGetSeriesItemSearchParams
) => {
  const { seriesCategory, appLocale } = searchParams;

  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('seriesCategory', seriesCategory);
  urlSearchParams.set('appLocale', appLocale);
  const url = `${BASE_URL}/api/series/${slug}?${urlSearchParams.toString()}`;
  const response = await fetch(url, {
    method: 'GET',
  });
  if (!response.ok) {
    console.error(response.status);
    throw Error('fetchGetSeriesItem error');
  }
  const json = await response.json();
  return json as {
    page: PageObjectResponse;
    recordMap: ExtendedRecordMap;
  };
};

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: 'GET',
  });
  const json = (await response.json()) as {
    users: PersonUserObjectResponse[];
  };
  return json;
};

export const fetchTags = cache(async () => {
  const response = await fetch(`${BASE_URL}/api/tags`, {
    method: 'GET',
  });
  const json = (await response.json()) as {
    tags: {
      id: string;
      name: string;
      color: string;
    }[];
  };
  return json;
});
