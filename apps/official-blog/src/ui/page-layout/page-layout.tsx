'use client';

import { GlobalLink } from '@coldsurfers/ocean-road/next';
import type { PropsWithChildren } from 'react';
import { Header } from '../header/header';
import {
  BigTitle,
  BigTitleWrapper,
  StyledPageLayoutContainer,
  SubTitle,
} from './page-layout.styled';

export const PageLayout = ({
  children,
  title,
  subTitle,
}: PropsWithChildren<{
  title?: string;
  subTitle?: string;
}>) => {
  return (
    <StyledPageLayoutContainer>
      <BigTitleWrapper>
        <GlobalLink href={'/'} style={{ width: 'auto' }}>
          <BigTitle as="h1">{title ?? 'COLDSURF BLOG'}</BigTitle>
          {subTitle && <SubTitle as="p">{subTitle}</SubTitle>}
        </GlobalLink>
      </BigTitleWrapper>
      <Header />
      {children}
    </StyledPageLayoutContainer>
  );
};
