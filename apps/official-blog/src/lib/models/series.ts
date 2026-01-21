import z from 'zod';
import { AppLocaleSchema } from './app-locale';

export const SeriesCategorySchema = z.union([
  z.literal('news'),
  z.literal('culture'),
  z.literal('voice'),
]);
export type SeriesCategory = z.infer<typeof SeriesCategorySchema>;

export const FetchGetSeriesSearchParamsSchema = z.object({
  seriesCategory: SeriesCategorySchema,
  appLocale: AppLocaleSchema,
  tag: z.string().optional(),
});
export type FetchGetSeriesSearchParams = z.infer<typeof FetchGetSeriesSearchParamsSchema>;

export const FetchGetSeriesItemSearchParamsSchema = z.object({
  seriesCategory: SeriesCategorySchema,
  appLocale: AppLocaleSchema,
});
export type FetchGetSeriesItemSearchParams = z.infer<typeof FetchGetSeriesItemSearchParamsSchema>;
