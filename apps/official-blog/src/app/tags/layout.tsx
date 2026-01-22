import {
  COMMON_META_DESCRIPTION,
  COMMON_META_TITLE,
  META_SITE_URL,
  metadataInstance,
} from '@/lib/metadata';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const dynamic = 'force-static';
export const revalidate = 3600;
export const generateStaticParams = () => {
  return [];
};

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

export default function TagsLayout({ children }: { children: ReactNode }) {
  return children;
}
