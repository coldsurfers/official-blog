'use client';

import type { SeriesItem } from '@/lib/models/series';
import { generateSeriesHref, generateSeriesItemHref } from '@/lib/utils';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { Text } from '../notion-renderer/renderer.text';
import {
  StyledPostDateText,
  StyledPostItemContainer,
  StyledPostPlatformText,
  StyledPostSubTitleText,
  StyledPostThumbnail,
  StyledPostTitleText,
} from './post-item.styled';

export const PostItem = memo((props: SeriesItem) => {
  const platformHref = useMemo(() => {
    if (props.officialBlogSeriesCategory) {
      return generateSeriesHref({
        seriesCategory: props.officialBlogSeriesCategory,
      });
    }
    return '#';
  }, [props.officialBlogSeriesCategory]);
  const postHref = useMemo(() => {
    if (props.officialBlogSeriesCategory) {
      return generateSeriesItemHref(props.officialBlogSeriesCategory, props.slug);
    }
    return '#';
  }, [props.officialBlogSeriesCategory, props.slug]);

  return (
    <StyledPostItemContainer>
      <Link href={postHref}>
        <StyledPostThumbnail
          src={
            props.thumbnailUrl
              ? props.thumbnailUrl
              : 'https://images.unsplash.com/photo-1734216736145-7cd4b41e6f77?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt={props.slug}
        />
      </Link>
      <Link href={platformHref}>
        <StyledPostPlatformText as="p">{props.officialBlogSeriesCategory}</StyledPostPlatformText>
      </Link>
      <Link href={postHref}>
        <StyledPostTitleText as="h2">
          <Text title={props.title} />
        </StyledPostTitleText>
      </Link>
      {props.subTitle && <StyledPostSubTitleText as="p">{props.subTitle}</StyledPostSubTitleText>}
      <StyledPostDateText as="p">{props.dateLocale}</StyledPostDateText>
    </StyledPostItemContainer>
  );
});
