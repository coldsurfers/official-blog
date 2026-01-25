import { createBlogError } from '@/lib/error';
import { generateLogListMetadata } from '@/lib/metadata';
import { AllSeriesCategories, SeriesCategorySchema } from '@/lib/models/series';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';
import { match } from 'ts-pattern';

export const revalidate = 3600;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return AllSeriesCategories.map((series) => {
    return {
      series,
    };
  });
}

export async function generateMetadata(props: {
  params: LayoutProps<'/[series]'>['params'];
}): Promise<Metadata> {
  const params = await props.params;
  const seriesCategoryValidation = SeriesCategorySchema.safeParse(params.series);
  if (!seriesCategoryValidation.success) {
    throw createBlogError(
      {
        type: 'invalid-series-category',
        seriesCategory: params.series,
      },
      {
        withSentryCapture: true,
      }
    );
  }
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

export default async function OfficialBlogSeriesLayout(props: {
  children: ReactNode;
  params: Promise<{
    series: string;
  }>;
}) {
  const params = await props.params;

  const { children } = props;

  const seriesCategoryValidation = SeriesCategorySchema.safeParse(params.series);
  if (!seriesCategoryValidation.success) {
    redirect('/');
  }
  return <>{children}</>;
}
