import { PAGINATION_PER_LINE } from '@/lib/constants';
import { media } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledPostListContainer = styled.div`

  ${media.medium(css`
    margin-top: 2rem;
  `)}
`;

export const StyledPostsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${PAGINATION_PER_LINE.DEFAULT}, minmax(0px, 1fr));
  gap: 0px 1.5rem;
  margin-bottom: 2rem;

  ${media.large(css`
    grid-template-columns: repeat(${PAGINATION_PER_LINE.LARGE}, minmax(0px, 1fr));
    gap: 0px 1.25rem;
  `)}

  ${media.medium(css`
    grid-template-columns: repeat(${PAGINATION_PER_LINE.MEDIUM}, minmax(0px, 1fr));
    gap: 0px 0.85rem;
  `)}
`;
