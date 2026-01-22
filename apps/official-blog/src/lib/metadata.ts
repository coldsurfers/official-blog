import {
  APP_STORE_ID,
  APP_STORE_URL,
  NextMetadataGenerator,
  PLAYSTORE_PACKAGE,
  PLAYSTORE_URL,
  SERVICE_NAME,
} from '@coldsurfers/shared-utils';
import type {
  PageObjectResponse,
  UserObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { Metadata } from 'next/types';
import type { SeriesCategory } from './models/series';

export const COMMON_META_TITLE = `OFFICIAL BLOG, ${SERVICE_NAME}`;
export const COMMON_META_DESCRIPTION = `${SERVICE_NAME}의 최신 소식`;
export const META_SITE_URL = 'https://blog.coldsurf.io';
export const SITE_MAP_URL = 'https://blog.coldsurf.io/sitemap.xml' as const;
export const LD_JSON_SAME_AS_LINKS = [
  META_SITE_URL,
  'https://coldsurf.io',
  APP_STORE_URL,
  PLAYSTORE_URL,
];
export const META_FAVICON_URL = `${META_SITE_URL}/icons/favicon.ico`;

export const metadataInstance = new NextMetadataGenerator({
  baseData: {
    keywords: [
      '공연',
      '예술',
      '문화예술',
      '인디',
      '인디 공연',
      '인디 라이브',
      '인디 밴드 공연',
      'underground',
      'alternative rock',
      'artist',
      'concert',
      '콘서트',
      'indie artist',
      '인디 아티스트',
      '뮤지컬',
      '연극',
      '클래식',
      '무용',
      '국악',
      '공연 티켓',
      '공연 추천',
      '티켓 추천',
      '라이브 공연',
      'South Korea Gigs',
      'South Korea Concerts',
      'South Korea Live Concerts',
    ],
    icons: {
      icon: '/icons/favicon.ico',
      shortcut: '/icons/favicon.ico',
      apple: '/icons/favicon.ico',
    },
    metadataBase: new URL(META_SITE_URL),
    appLinks: {
      ios: {
        app_name: SERVICE_NAME,
        app_store_id: APP_STORE_ID,
        url: APP_STORE_URL,
      },
      android: {
        app_name: SERVICE_NAME,
        package: PLAYSTORE_PACKAGE,
        url: PLAYSTORE_URL,
      },
    },
    openGraph: {
      siteName: SERVICE_NAME,
      title: COMMON_META_TITLE,
      description: COMMON_META_DESCRIPTION,
    },
  },
});

export const generateLogListMetadata = ({
  title,
  description,
  seriesCategory,
}: {
  title: string;
  description: string;
  seriesCategory?: SeriesCategory;
}) => {
  const metaTitle = title;
  const metaDescription = description;

  const meta = metadataInstance.generateMetadata<Metadata>({
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      url: seriesCategory ? `${META_SITE_URL}/${seriesCategory}` : undefined,
    },
    alternates: {
      canonical: seriesCategory ? `${META_SITE_URL}/${seriesCategory}` : undefined,
      languages: seriesCategory
        ? {
            ko: `${META_SITE_URL}/${seriesCategory}`,
          }
        : undefined,
    },
  });

  return meta;
};

export const generateLogDetailMetadata = (
  page: PageObjectResponse | null,
  options: {
    slug: string;
    seriesCategory: SeriesCategory;
  }
) => {
  if (!page) {
    return {
      title: `BLOG, ${SERVICE_NAME}`,
    };
  }

  const pageTitle = (() => {
    if (page?.properties.Name.type !== 'title') {
      return '';
    }
    return page.properties.Name.title.at(0)?.plain_text ?? '';
  })();

  const subTitle = (() => {
    if (page?.properties.subTitle.type !== 'rich_text') {
      return '';
    }
    return page.properties.subTitle?.rich_text?.at(0)?.plain_text ?? '';
  })();

  if (!pageTitle) {
    return {
      title: `BLOG, ${SERVICE_NAME}`,
    };
  }

  const writers = (() => {
    if (page.properties?.Writer.type !== 'people') {
      return [];
    }
    return page?.properties?.Writer.people
      .map((value) => {
        const _value = value as UserObjectResponse;
        return _value.name;
      })
      .filter((value) => value !== null);
  })();

  const publishDate = (() => {
    if (page.properties?.['Publish date']?.type !== 'date') {
      return null;
    }
    return page.properties?.['Publish date'].date?.start
      ? new Date(page.properties?.['Publish date'].date.start)
      : null;
  })();

  const tags = (() => {
    if (page.properties.tags.type !== 'multi_select') {
      return [];
    }
    return page.properties.tags.multi_select.map((value) => ({
      id: value.id,
      name: value.name,
      color: value.color,
    }));
  })();

  const authors: Metadata['authors'] = writers.map((name: string) => {
    return {
      name,
    };
  });

  const thumbnailUrl = (() => {
    if (page.properties?.thumb.type !== 'url') {
      return '';
    }
    return page.properties?.thumb.url ?? '';
  })();

  const metadata: Metadata = metadataInstance.generateMetadata<Metadata>({
    title: `${pageTitle} | BLOG, ${SERVICE_NAME}`,
    description: subTitle ?? pageTitle,
    authors,
    openGraph: {
      type: 'article',
      publishedTime: publishDate?.toISOString(),
      authors: writers,
      url: `${META_SITE_URL}/${options.seriesCategory}/${options.slug}`,
      title: pageTitle,
      description: subTitle ?? pageTitle,
      images: [
        {
          url: thumbnailUrl ?? '',
        },
      ],
    },
    keywords: tags.map((tag) => tag.name),
    alternates: {
      canonical: `${META_SITE_URL}/${options.seriesCategory}/${options.slug}`,
      languages: {
        ko: `${META_SITE_URL}/${options.seriesCategory}/${options.slug}`,
      },
    },
  });

  return metadata;
};
