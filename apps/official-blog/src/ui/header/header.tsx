'use client';

import { seriesUtils } from '@/lib/utils';
import { useParams, usePathname } from 'next/navigation';
import { memo, useMemo } from 'react';
import {
  StyledHeaderBigContainer,
  StyledHeaderContainer,
  StyledHeaderHeading,
  StyledHeaderLinkBadge,
} from './header.styled';

const HeaderBadge = memo(
  ({ href, isActive, title }: { href: string; isActive: boolean; title: string }) => {
    return (
      <StyledHeaderLinkBadge href={href} $isactive={isActive ? 'true' : undefined}>
        <StyledHeaderHeading $isactive={isActive ? 'true' : undefined} as="p">
          {title}
        </StyledHeaderHeading>
      </StyledHeaderLinkBadge>
    );
  }
);

export const Header = () => {
  const params = useParams();
  const seriesParam = useMemo(() => {
    return params.series as string;
  }, [params.series]);

  const data = useMemo(
    () => seriesUtils.category.getHeaderHrefData({ seriesParam }),
    [seriesParam]
  );

  return (
    <StyledHeaderBigContainer>
      <StyledHeaderContainer>
        {data.map((item) => (
          <HeaderBadge key={item.title} {...item} />
        ))}
      </StyledHeaderContainer>
    </StyledHeaderBigContainer>
  );
};
