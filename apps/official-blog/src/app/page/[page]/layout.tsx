import { fetchSeriesList } from '@/lib/fetchers';
import type { ReactNode } from 'react';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const generateStaticParams = async () => {
  const { totalPage } = await fetchSeriesList({ tag: undefined });
  return Array.from({ length: totalPage }, (_, index) => ({
    page: `${index + 1}`,
  }));
};

export default function OfficialBlogArticleListByPageLayout({ children }: { children: ReactNode }) {
  return children;
}
