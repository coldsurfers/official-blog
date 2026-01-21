import { PageLayout } from '@/ui/page-layout';
import { RouteLoading } from '@coldsurfers/ocean-road/next';

export default function Home() {
  return (
    <RouteLoading>
      <PageLayout />
    </RouteLoading>
  );
}
