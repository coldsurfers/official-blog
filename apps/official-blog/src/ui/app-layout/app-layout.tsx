'use client';

import { breakpoints } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import type { PropsWithChildren } from 'react';

const Layout = styled.div`
    max-width: ${breakpoints['xx-large']}px;
    margin-left: auto;
    margin-right: auto;
`;

export const AppLayout = ({ children }: PropsWithChildren) => {
  return <Layout>{children}</Layout>;
};
