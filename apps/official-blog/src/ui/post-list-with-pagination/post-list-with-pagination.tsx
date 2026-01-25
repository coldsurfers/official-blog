'use client';

import type { SeriesCategory, SeriesItem } from '@/lib/models/series';
import { Pagination } from '../pagination';
import { PostList } from '../post-list/post-list';

type SeriesListAllProps = {
  postItems: SeriesItem[];
  totalPage: number;
  currentPage: number;
  seriesCategory: SeriesCategory | null;
};

export const PostListWithPagination = ({
  postItems,
  totalPage,
  currentPage,
  seriesCategory,
}: SeriesListAllProps) => {
  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        seriesCategory={seriesCategory}
        appLocale={'ko'}
      />
      <PostList postItems={postItems} page={currentPage} />
    </>
  );
};
