import { createBlogError } from '@/lib/error';
import { fetchSeries } from '@/lib/fetchers';
import { SeriesCategorySchema } from '@/lib/models/series';
import { seriesUtils } from '@/lib/utils';
import { PageLayout } from '@/ui/page-layout';
import { PostListWithPagination } from '@/ui/post-list-with-pagination';

export default async function OfficialBlogSeriesPage(props: {
  params: Promise<{
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
  const seriesCategory = seriesCategoryValidation.data;

  const { postItems, totalPage } = await fetchSeries({
    appLocale: 'ko',
    seriesCategory,
    tag: undefined,
  });
  return (
    <PageLayout title={seriesUtils.category.convertSeriesCategoryToTitle(seriesCategory)}>
      <PostListWithPagination
        seriesCategory={seriesCategory}
        postItems={postItems}
        totalPage={totalPage}
        currentPage={1}
      />
    </PageLayout>
  );
}
