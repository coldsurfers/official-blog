import { createBlogError } from '@/lib/error';
import { generateLogListMetadata } from '@/lib/metadata';
import { AllSeriesCategories, SeriesCategorySchema } from '@/lib/models/series';
import { seriesUtils } from '@/lib/utils';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next/types';
import type { ReactNode } from 'react';

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
  const { title, description } = seriesUtils.category.getMeta(seriesCategoryValidation.data);

  return generateLogListMetadata({
    title,
    description,
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
