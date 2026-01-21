import {
  APP_STORE_ID,
  APP_STORE_URL,
  NextMetadataGenerator,
  PLAYSTORE_PACKAGE,
  PLAYSTORE_URL,
  SERVICE_NAME,
} from '@coldsurfers/shared-utils';

export const COMMON_META_TITLE = `OFFICIAL BLOG, ${SERVICE_NAME}`;
export const COMMON_META_DESCRIPTION = `${SERVICE_NAME}의 최신 소식`;
export const META_SITE_URL = 'https://blog.coldsurf.io';
export const LD_JSON_SAME_AS_LINKS = [META_SITE_URL, APP_STORE_URL, PLAYSTORE_URL];
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
