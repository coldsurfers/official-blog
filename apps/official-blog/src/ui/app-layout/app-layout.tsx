'use client';

import {
  ColorSchemeToggle,
  MenuItem,
  Text,
  breakpoints,
  semantics,
  useColorScheme,
} from '@coldsurfers/ocean-road';
import { AppFooter, AppHeader, GlobalLink } from '@coldsurfers/ocean-road/next';
import { APP_STORE_URL, PLAYSTORE_URL, SNS_LINKS } from '@coldsurfers/shared-utils';
import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

const Layout = styled.div`
    max-width: ${breakpoints['xx-large']}px;
    padding-top: 88px;
    margin-left: auto;
    margin-right: auto;
`;

const AccordionMenuText = styled(Text)`
  font-size: 24px;
  border-bottom: 1px solid ${semantics.color.border[2]};
  padding-bottom: 16px;
  color: ${semantics.color.foreground[1]};
  font-weight: 550;
  width: 100%;
`;

export const AppLayout = ({ children }: PropsWithChildren) => {
  const { theme } = useColorScheme();
  return (
    <Layout>
      <AppHeader.FloatingHeader
        serviceName="COLDSURF, BLOG"
        HeaderMenuItemComponent={
          <>
            <GlobalLink href="https://coldsurf.io">
              <MenuItem>라이브 이벤트</MenuItem>
            </GlobalLink>
            <GlobalLink href="https://coldsurf.io/browse">
              <MenuItem>탐색하기</MenuItem>
            </GlobalLink>
            <GlobalLink href="https://coldsurf.io/feed">
              <MenuItem>새 소식</MenuItem>
            </GlobalLink>
          </>
        }
        ColorSchemeToggleComponent={
          <ColorSchemeToggle
            onToggle={({ setTheme }) => setTheme(theme.name === 'darkMode' ? 'light' : 'dark')}
          />
        }
      />
      <AppHeader.FullScreenMobileAccordionDrawer
        standalone={false}
        data={[
          {
            accordionKey: 'live-events',
            title: '라이브 이벤트',
          },
          {
            accordionKey: 'browse',
            title: '탐색하기',
          },
          {
            accordionKey: 'feed',
            title: '새 소식',
          },
        ]}
        renderTrigger={(item) => {
          return (
            <GlobalLink href={`https://coldsurf.io/${item.accordionKey}`}>
              <AccordionMenuText as="p">{item.title}</AccordionMenuText>
            </GlobalLink>
          );
        }}
        renderExpanded={() => null}
        ColorSchemeToggleComponent={
          // @TODO: Singleton ColorSchemeToggle on ocean-road
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
