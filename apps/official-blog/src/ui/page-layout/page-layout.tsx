'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  return (
    <StyledPageLayoutContainer>
      <BigTitleWrapper>
        <Link href={'/'} style={{ width: 'auto' }}>
          <BigTitle as="h1">{title ?? 'COLDSURF BLOG'}</BigTitle>
          {subTitle && <SubTitle as="p">{subTitle}</SubTitle>}
        </Link>
      </BigTitleWrapper>
      {process.env.NODE_ENV === 'development' && pathname === '/blog/about/paul' ? null : (
        <Header />
      )}
      {children}
    </StyledPageLayoutContainer>
  );
};
