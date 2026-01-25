'use client';

import { ColorSchemeToggle, breakpoints, useColorScheme } from '@coldsurfers/ocean-road';
import { AppFooter, AppHeader } from '@coldsurfers/ocean-road/next';
import { APP_STORE_URL, PLAYSTORE_URL, SNS_LINKS } from '@coldsurfers/shared-utils';
import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

const Layout = styled.div`
    max-width: ${breakpoints['xx-large']}px;
    padding-top: 88px;
    margin-left: auto;
    margin-right: auto;
`;

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { theme } = useColorScheme();
  return (
    <Layout>
      <AppHeader.FloatingHeader
        serviceName="COLDSURF, BLOG"
        HeaderMenuItemComponent={null}
        ColorSchemeToggleComponent={
          <ColorSchemeToggle
            onToggle={({ setTheme }) => setTheme(theme.name === 'darkMode' ? 'light' : 'dark')}
          />
        }
      />
      {children}
      <AppFooter
        appStoreUrl={APP_STORE_URL}
        playStoreUrl={PLAYSTORE_URL}
        instagramUrl={SNS_LINKS.INSTAGRAM}
        xUrl={SNS_LINKS.X}
      />
    </Layout>
  );
};
