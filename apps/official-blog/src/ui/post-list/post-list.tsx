'use client';

import { PAGINATION_PER_LINE, PAGINATION_PER_PAGE } from '@/lib/constants';
import type { SeriesItem } from '@/lib/models/series';
import { memo, useMemo } from 'react';
import { PostItem } from '../post-item';
import { StyledPostListContainer, StyledPostsGridContainer } from './post-list.styled';

type PostListProps = { postItems: SeriesItem[]; page: number };

export const PostList = memo(({ postItems, page }: PostListProps) => {
  const offset = useMemo(() => (page - 1) * PAGINATION_PER_PAGE, [page]);

  return (
    <StyledPostListContainer>
      <StyledPostsGridContainer>
        {postItems.slice(offset, offset + PAGINATION_PER_LINE).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </StyledPostsGridContainer>
      <StyledPostsGridContainer>
        {postItems
          .slice(offset + PAGINATION_PER_LINE, offset + PAGINATION_PER_LINE * 2)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
      </StyledPostsGridContainer>
      <StyledPostsGridContainer>
        {postItems
          .slice(offset + PAGINATION_PER_LINE * 2, offset + PAGINATION_PER_LINE * 3)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
      </StyledPostsGridContainer>
    </StyledPostListContainer>
  );
});
