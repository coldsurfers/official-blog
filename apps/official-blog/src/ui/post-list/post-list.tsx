'use client';

import { usePostListPagination } from '@/lib/hooks/use-post-list-pagination';
import type { SeriesItem } from '@/lib/models/series';
import { memo, useMemo } from 'react';
import { PostItem } from '../post-item';
import { StyledPostListContainer, StyledPostsGridContainer } from './post-list.styled';

type PostListProps = { postItems: SeriesItem[]; page: number };

export const PostList = memo(({ postItems, page }: PostListProps) => {
  const { perLine, perPage } = usePostListPagination();
  const offset = useMemo(() => (page - 1) * perPage, [page, perPage]);

  return (
    <StyledPostListContainer>
      <StyledPostsGridContainer>
        {postItems.slice(offset, offset + perLine).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </StyledPostsGridContainer>
      <StyledPostsGridContainer>
        {postItems.slice(offset + perLine, offset + perLine * 2).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </StyledPostsGridContainer>
      <StyledPostsGridContainer>
        {postItems.slice(offset + perLine * 2, offset + perLine * 3).map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </StyledPostsGridContainer>
    </StyledPostListContainer>
  );
});
