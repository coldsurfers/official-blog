import { createBlogError } from '@/lib/error';
import { generateLogDetailMetadata } from '@/lib/metadata';
import type { AppLocale } from '@/lib/models/app-locale';
import { SeriesCategorySchema } from '@/lib/models/series';
import { queryAllSeries, querySeriesItem } from '@/lib/query';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';

export const revalidate = 3600;
export const dynamic = 'force-static';

const DEFAULT_APP_LOCALE: AppLocale = 'ko';

export async function generateStaticParams() {
  const allSeriesItems = await queryAllSeries({
    lang: DEFAULT_APP_LOCALE,
  });
  return allSeriesItems.map((value) => ({
    slug: value.slug,
    series: value.officialBlogSeriesCategory,
  }));
}

export async function generateMetadata(props: {
  params: LayoutProps<'/[series]/[slug]'>['params'];
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
  const page = await querySeriesItem({
    slug: params.slug,
    // default korean
    lang: 'ko',
    seriesCategory: seriesCategoryValidation.data,
  });
  return generateLogDetailMetadata(page, {
    slug: params.slug,
    seriesCategory: seriesCategoryValidation.data,
  });
}

export default async function OfficialBlogSeriesSlugLayout(props: {
  children: ReactNode;
  params: Promise<{ series: string; slug: string }>;
}) {
  const { children } = props;
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
  return <>{children}</>;
}
