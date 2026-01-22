import { createBlogError } from '@/lib/error';
import { fetchSeries } from '@/lib/fetchers';
import { SeriesCategorySchema } from '@/lib/models/series';
import { convertSeriesCategoryToTitle } from '@/lib/utils';
import { PageLayout } from '@/ui/page-layout';
import { PostListWithPagination } from '@/ui/post-list-with-pagination';
import { RouteLoading } from '@coldsurfers/ocean-road/next';
import { notFound } from 'next/navigation';

export default async function BlogArticleListByPage({
  params,
}: {
  params: Promise<{
    page: string;
    series: string;
  }>;
}) {
  const { page, series } = await params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: series,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  const { postItems, totalPage } = await fetchSeries({
    appLocale: 'ko',
    seriesCategory: seriesCategoryValidation.data,
    tag: undefined,
  });

  if (Number.isNaN(+page) || +page > totalPage || +page < 1) {
    return notFound();
  }

  return (
    <RouteLoading deps={[page]}>
      <PageLayout title={convertSeriesCategoryToTitle(seriesCategoryValidation.data)}>
        <PostListWithPagination
          postItems={postItems}
          totalPage={totalPage}
          currentPage={Number(page)}
          seriesCategory={seriesCategoryValidation.data}
        />
      </PageLayout>
    </RouteLoading>
  );
}
