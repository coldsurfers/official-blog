import { fetchTags } from '@/lib/fetchers';
import { PageLayout } from '@/ui/page-layout';
import { TagList } from '@/ui/tag-list';
import { RouteLoading } from '@coldsurfers/ocean-road/next';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function TagsPage() {
  const data = await fetchTags();
  const tags = data.tags;

  return (
    <RouteLoading>
      <PageLayout title="Tags">
        <div style={{ marginTop: '6.5rem' }} />
        {tags && <TagList tags={tags} />}
      </PageLayout>
    </RouteLoading>
  );
}
