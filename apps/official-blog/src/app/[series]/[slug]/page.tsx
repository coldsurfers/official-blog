import { createBlogError } from '@/lib/error';
import { fetchSeriesItem } from '@/lib/fetchers';
import { type FetchGetSeriesItemSearchParams, SeriesCategorySchema } from '@/lib/models/series';
import { LogDetailRenderer } from '@/ui/notion-renderer/log-detail-renderer';
import { Suspense, cache } from 'react';

const getSeriesItemStatic = cache(
  async (slug: string, searchParams: FetchGetSeriesItemSearchParams) => {
    const response = await fetchSeriesItem(slug, searchParams);
    return response;
  }
);

export default async function OfficialBlogSeriesSlugPage(props: {
  params: Promise<{
    slug: string;
    series: string;
  }>;
}) {
  const params = await props.params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(params.series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: params.series,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  const initialData = await getSeriesItemStatic(params.slug, {
    seriesCategory: seriesCategoryValidation.data,
    appLocale: 'ko',
  });

  return (
    <Suspense>
      <LogDetailRenderer
        slug={params.slug}
        seriesCategory={seriesCategoryValidation.data}
        initialData={initialData}
      />
    </Suspense>
  );
}
