import { createBlogError } from '@/lib/error';
import { fetchSeries } from '@/lib/fetchers';
import { generateLogListMetadata } from '@/lib/metadata';
import { SeriesCategorySchema } from '@/lib/models/series';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import { match } from 'ts-pattern';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams({
  params,
}: {
  params: Awaited<LayoutProps<'/[series]/page/[page]'>['params']>;
}) {
  const seriesParams = await params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(seriesParams.series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: seriesParams.series,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  const seriesCategory = seriesCategoryValidation.data;
  const { totalPage } = await fetchSeries({
    appLocale: 'ko',
    seriesCategory,
    tag: undefined,
  });
  return Array.from({ length: totalPage }, (_, index) => ({
    page: `${index + 1}`,
    series: seriesCategory,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: LayoutProps<'/[series]/page/[page]'>['params'];
}): Promise<Metadata> {
  const layoutParams = await params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(layoutParams.series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: layoutParams.series,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  // @TODO: 동일 패턴 하나로 util화
  const metaTitle = match(seriesCategoryValidation.data)
    .with('news', () => 'COLDSURF Blog: NEWS')
    .with('culture', () => 'COLDSURF Blog: CULTURE')
    .with('voice', () => 'COLDSURF Blog: VOICE')
    .otherwise(() => '');

  const metaDescription = match(seriesCategoryValidation.data)
    .with('news', () => 'Article about news')
    .with('culture', () => 'Article about culture')
    .with('voice', () => `Article about editor's note`)
    .otherwise(() => '');

  return generateLogListMetadata({
    title: metaTitle,
    description: metaDescription,
    seriesCategory: seriesCategoryValidation.data,
  });
}

export default async function OfficialBlogArticleListByPageLayout({
  children,
  params,
}: { children: ReactNode; params: Promise<{ page: string; series: string }> }) {
  const seriesParams = (await params).series;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(seriesParams);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: seriesParams,
      },
      {
        withSentryCapture: true,
      }
    );
  }
  return children;
}
