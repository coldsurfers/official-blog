import { META_SITE_URL } from '@/lib/metadata';
import { AllSeriesCategories } from '@/lib/models/series';
import { queryAllSeries, queryTags } from '@/lib/query';
import { cache } from 'react';

const generateUrl = (subPath: string) => {
  return `${META_SITE_URL}${subPath}`;
};

const generateBlogSitemaps = cache(async () => {
  const allSeries = await queryAllSeries({
    lang: 'ko',
  });
  const allSeriesItemsValues = allSeries.map((value) => ({
    slug: value.slug,
    seriesCategory: value.officialBlogSeriesCategory,
    lastModified: value.lastEditedTime,
  }));
  const allTags = await queryTags()();
  const allTagsByLocales = allTags.flatMap((tag) => {
    return {
      tag: tag.name,
      locale: 'ko',
    };
  });

  const allSeriesEntry = AllSeriesCategories.map((series) => {
    return {
      url: generateUrl(`/${series}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const allSeriesItemsEntry = allSeriesItemsValues.map(({ slug, seriesCategory, lastModified }) => {
    return {
      url: generateUrl(`/${seriesCategory ?? ''}/${slug}`),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  const allTagsEntry = allTagsByLocales.map(({ tag }) => {
    return {
      url: generateUrl(`/tags/${tag}`),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  return [
    {
      url: generateUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...allSeriesEntry,
    ...allSeriesItemsEntry,
    {
      url: generateUrl('/tags'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...allTagsEntry,
  ];
});

export default async function sitemap() {
  const blogSitemaps = await generateBlogSitemaps();

  return [...blogSitemaps];
}
