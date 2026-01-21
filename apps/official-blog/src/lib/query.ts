import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';
import type { AppLocale } from './models/app-locale';
import type { SeriesCategory } from './models/series';
import notionInstance, { notionDatabaseIds } from './notion-instance';
import { parseSeriesItems } from './parser';

export const querySeries = cache(
  async ({
    seriesCategory,
    lang,
    tag,
  }: {
    seriesCategory: SeriesCategory;
    lang: AppLocale;
    tag?: string;
  }) => {
    const filter: QueryDatabaseParameters['filter'] = {
      and: [
        {
          property: 'Status',
          status: {
            equals: 'Published',
          },
        },
        {
          property: 'lang',
          multi_select: {
            contains: lang,
          },
        },
      ],
    };
    if (tag) {
      filter.and.push({
        property: 'tags',
        multi_select: {
          contains: tag,
        },
      });
    }
    filter.and.push({
      property: 'platform',
      multi_select: {
        contains: 'official-blog',
      },
    });
    filter.and.push({
      property: 'OfficialBlogSeriesCategory',
      multi_select: {
        contains: seriesCategory,
      },
    });
    const result = await notionInstance.databases.query({
      database_id: notionDatabaseIds.blog ?? '',
      sorts: [
        {
          property: 'Publish date',
          direction: 'descending',
        },
      ],
      filter,
    });
    return parseSeriesItems(result);
  }
);
