import z from 'zod';
import { AppLocaleSchema } from './app-locale';

export const SeriesCategorySchema = z.union([
  z.literal('news'),
  z.literal('culture'),
  z.literal('voice'),
]);
export type SeriesCategory = z.infer<typeof SeriesCategorySchema>;

export const AllSeriesCategories: SeriesCategory[] = ['news', 'culture', 'voice'];

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

export const SeriesItemSchema = z.object({
  id: z.string(),
  createdTime: z.string(),
  lastEditedTime: z.string(),
  dateLocale: z.string(),
  slug: z.string(),
  title: z.any().array(), // RichTextItemResponse[]
  subTitle: z.string().optional(),
  status: z.string(),
  writer: z.object({}), // PartialUserObjectResponse
  lang: AppLocaleSchema,
  officialBlogSeriesCategory: SeriesCategorySchema.optional(),
  thumbnailUrl: z.string().nullable(),
});
export type SeriesItem = z.infer<typeof SeriesItemSchema>;
