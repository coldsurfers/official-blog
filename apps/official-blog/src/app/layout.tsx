import {
  COMMON_META_TITLE,
  LD_JSON_SAME_AS_LINKS,
  META_FAVICON_URL,
  META_SITE_URL,
  metadataInstance,
} from '@/lib/metadata';
import { pretendard } from '@/lib/pretendard';
import { ErrorBoundaryRegistry } from '@/registries/error-boundary-registry';
import { OceanRoadThemeRegistry } from '@/registries/ocean-road-registry';
import { SERVICE_NAME } from '@coldsurfers/shared-utils';

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
          <ErrorBoundaryRegistry>{children}</ErrorBoundaryRegistry>
        </OceanRoadThemeRegistry>
      </body>
    </html>
  );
}
