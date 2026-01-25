import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledPostListContainer = styled.div`
  margin-top: 6.5rem;

  ${media.medium(css`
    margin-top: 2rem;
  `)}
`;

export const StyledPostsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  gap: 0px 2rem;
  margin-bottom: 2rem;

  ${media.medium(css`
    grid-template-columns: repeat(2, minmax(0px, 1fr));
    gap: 0.85rem;
  `)}
`;
