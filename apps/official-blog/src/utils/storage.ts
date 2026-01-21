import { tryParse } from '@coldsurfers/shared-utils';

export const storageItem = {
  theme: '@coldsurf-blog/theme',
} as const;

export type StorageItem = (typeof storageItem)[keyof typeof storageItem];

const storage =
  typeof window !== 'undefined'
    ? {
        set(item: StorageItem, value: string) {
          localStorage.setItem(item, value);
        },
        get<ParsedValueT>(item: StorageItem) {
          const value = localStorage.getItem(item);
          try {
            if (!value) return null;
            const parsed = tryParse(value, { fallback: value }) as ParsedValueT;
            return parsed;
          } catch (e) {
            console.error(e);
            return value as ParsedValueT;
          }
        },
        remove(item: StorageItem) {
          localStorage.removeItem(item);
        },
        clear() {
          localStorage.clear();
        },
      }
    : null;

export default storage;
