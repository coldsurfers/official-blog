import {
  COMMON_META_DESCRIPTION,
  COMMON_META_TITLE,
  META_SITE_URL,
  metadataInstance,
} from '@/lib/metadata';
import { queryTags } from '@/lib/query';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const dynamic = 'force-static';
export const revalidate = 3600;
export async function generateStaticParams() {
  const allTags = await queryTags()();
  const params = allTags.map((tag) => {
    return {
      tag: tag.name,
    };
  });
  return params;
}

export function generateMetadata(): Metadata {
  return metadataInstance.generateMetadata<Metadata>({
    title: COMMON_META_TITLE,
    description: COMMON_META_DESCRIPTION,
    openGraph: {
      type: 'website',
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
      url: META_SITE_URL,
    },
  });
}

export default function TagsTagLayout({ children }: { children: ReactNode }) {
  return children;
}
