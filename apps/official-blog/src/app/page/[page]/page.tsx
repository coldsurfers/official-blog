import { fetchSeriesList } from '@/lib/fetchers';
import { PageLayout } from '@/ui/page-layout';
import { PostListWithPagination } from '@/ui/post-list-with-pagination';
import { RouteLoading } from '@coldsurfers/ocean-road/next';
import { notFound } from 'next/navigation';

export default async function OfficialBlogArticleListByPage({
  params,
}: {
  params: Promise<{
    page: string;
  }>;
}) {
  const { page } = await params;

  const { allPostItems, totalPage } = await fetchSeriesList({
    tag: undefined,
  });

  if (Number.isNaN(+page) || +page > totalPage || +page < 1) {
    return notFound();
  }

  return (
    <RouteLoading deps={[page]}>
      <PageLayout>
        <PostListWithPagination
          postItems={allPostItems}
          seriesCategory={null}
          totalPage={totalPage}
          currentPage={Number(page)}
        />
      </PageLayout>
    </RouteLoading>
  );
}
