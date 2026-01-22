import { fetchSeriesList } from '@/lib/fetchers';
import { queryTags } from '@/lib/query';
import { PostListTag } from '@/ui/post-list';
import { RouteLoading } from '@coldsurfers/ocean-road/next';

export async function generateStaticParams() {
  const allTags = await queryTags()();
  const params = allTags.map((tag) => {
    return {
      tag: tag.name,
    };
  });
  return params;
}

export default async function TagDetailPage(props: {
  params: Promise<{
    tag: string;
  }>;
}) {
  const params = await props.params;
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);

  const { allPostItems } = await fetchSeriesList({
    tag: decodedTag,
  });

  return (
    <RouteLoading>
      <PostListTag tag={decodedTag} postItems={allPostItems} />
    </RouteLoading>
  );
}
