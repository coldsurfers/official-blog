import {
  COMMON_META_DESCRIPTION,
  COMMON_META_TITLE,
  LD_JSON_SAME_AS_LINKS,
  META_FAVICON_URL,
  META_SITE_URL,
  metadataInstance,
} from '@/lib/metadata';
import { pretendard } from '@/lib/pretendard';
import { ErrorBoundaryRegistry } from '@/registries/error-boundary-registry';
import { OceanRoadThemeRegistry } from '@/registries/ocean-road-registry';
import { QueryClientRegistry } from '@/registries/query-client-registry';
import { AppLayout } from '@/ui/app-layout';
import { AppFooter } from '@coldsurfers/ocean-road/next';
import { APP_STORE_URL, PLAYSTORE_URL, SERVICE_NAME, SNS_LINKS } from '@coldsurfers/shared-utils';
import type { Metadata } from 'next/types';

export const revalidate = 3600;

export const dynamic = 'force-static';

export const generateStaticParams = async () => {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendard.className}>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              metadataInstance.generateLdJson({
                type: 'Brand',
                image: META_FAVICON_URL,
                logo: META_FAVICON_URL,
                url: META_SITE_URL,
                name: SERVICE_NAME,
                sameAs: LD_JSON_SAME_AS_LINKS,
              })
            ),
          }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              metadataInstance.generateLdJson({
                type: 'WebSite',
                url: META_SITE_URL,
                name: COMMON_META_TITLE,
              })
            ),
          }}
        />
        <OceanRoadThemeRegistry>
          <ErrorBoundaryRegistry>
            <QueryClientRegistry>
              <AppLayout>
                {children}
                <AppFooter
                  appStoreUrl={APP_STORE_URL}
                  playStoreUrl={PLAYSTORE_URL}
                  instagramUrl={SNS_LINKS.INSTAGRAM}
                  xUrl={SNS_LINKS.X}
                />
              </AppLayout>
            </QueryClientRegistry>
          </ErrorBoundaryRegistry>
        </OceanRoadThemeRegistry>
      </body>
    </html>
  );
}
