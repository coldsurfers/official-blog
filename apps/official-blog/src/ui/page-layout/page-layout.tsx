'use client';

import Link from 'next/link';
import type { PropsWithChildren } from 'react';
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
        <Link href={'/'} style={{ width: 'auto' }}>
          <BigTitle as="h1">{title ?? 'COLDSURF BLOG'}</BigTitle>
          {subTitle && <SubTitle as="p">{subTitle}</SubTitle>}
        </Link>
      </BigTitleWrapper>
      {children}
    </StyledPageLayoutContainer>
  );
};
