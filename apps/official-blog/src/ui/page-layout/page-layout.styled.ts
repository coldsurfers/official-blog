'use client';

import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledPageLayoutContainer = styled.main`
  max-width: 1728px;
  margin: 2rem auto;

  padding-left: 1rem;
  padding-right: 1rem;

  ${media.large(css`
    max-width: 1536px;
  `)}

  ${media.medium(css`
    width: 100%;
  `)}
`;

export const BigTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;

  ${media.medium(css`
    margin-top: 2rem;
  `)}
`;

export const BigTitle = styled(Text)`
  font-size: 4rem;
  font-weight: 820;
  line-height: 1.05;
  text-align: center;

  margin-bottom: 22px;

  color: ${semantics.color.foreground[1]};

  ${media.large(css`
    font-size: 64px;
  `)}

  ${media.medium(css`
    font-size: 48px;
  `)}

  ${media.small(css`
    font-size: 36px;
  `)}
`;

export const SubTitle = styled(Text)`
  font-size: 1.85rem;
  font-weight: 500;
  line-height: 1.05;
  text-align: center;

  margin: unset;

  color: ${semantics.color.foreground[4]};

  ${media.large(css`
    font-size: 1.65rem;
    margin-bottom: 1rem;
  `)}

  ${media.medium(css`
    font-size: 1.35rem;
  `)}

  ${media.small(css`
    font-size: 1.2rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-bottom: 0.5rem;
  `)}
`;
