'use client';

import type { SeriesItem } from '@/lib/models/series';
import { memo } from 'react';
import { PageLayout } from '../page-layout';
import { PostItem } from '../post-item';
import { StyledPostsGridContainer } from './post-list.styled';

type TagPostListProps = { tag: string; postItems: SeriesItem[] };

export const PostListTag = memo(({ tag, postItems }: TagPostListProps) => {
  return (
    <PageLayout title={`#${tag}`}>
      <div style={{ marginTop: '6.5rem' }} />
      <StyledPostsGridContainer>
        {postItems.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </StyledPostsGridContainer>
    </PageLayout>
  );
});
