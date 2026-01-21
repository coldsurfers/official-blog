import { fetchSeriesList } from '@/lib/fetchers';
import { PageLayout } from '@/ui/page-layout';
import { Pagination } from '@/ui/pagination';
import { PostList } from '@/ui/post-list';
import { RouteLoading } from '@coldsurfers/ocean-road/next';

export default async function Home() {
  const { allPostItems, totalPage } = await fetchSeriesList({
    tag: undefined,
  });
  return (
    <RouteLoading>
      <PageLayout>
        <PostList postItems={allPostItems} page={1} />
        <Pagination currentPage={1} totalPage={totalPage} seriesCategory={null} appLocale={'ko'} />
      </PageLayout>
    </RouteLoading>
  );
}
