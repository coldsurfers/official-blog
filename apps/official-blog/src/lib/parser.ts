import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

export function parseSeriesItems(result: QueryDatabaseResponse) {
  const seriesItems = result?.results?.map((post) => {
    const createdTime = (() => {
      const _post = post as PageObjectResponse;
      const pubDate = _post.properties?.['Publish date'];
      if (pubDate.type === 'date') {
        return pubDate.date?.start ? new Date(pubDate.date?.start) : null;
      }
      return null;
    })();
    const lastEditedTime = (() => {
      const _post = post as PageObjectResponse;
      return new Date(_post.last_edited_time);
    })();
    const slug = (() => {
      const _post = post as PageObjectResponse;
      const _slug = _post.properties.Slug;
      if (_slug.type !== 'rich_text') {
        return '';
      }
      const richText = _slug.rich_text.at(0);
      if (!richText) {
        return '';
      }
      return richText.type === 'text' ? richText.text.content : '';
    })();
    const title = (() => {
      const _post = post as PageObjectResponse;
      return _post.properties?.Name?.type === 'title' ? _post.properties.Name.title : null;
    })();
    const postStatus = (() => {
      const _post = post as PageObjectResponse;
      const status = _post.properties.Status;
      if (status.type !== 'status') {
        return '';
      }
      return status.status?.name;
    })();
    const lang = (() => {
      const _post = post as PageObjectResponse;
      const _lang = _post.properties.lang;
      if (_lang.type !== 'multi_select') {
        return null;
      }
      return _lang.multi_select.at(0)?.name;
    })();
    const writer = (() => {
      const _post = post as PageObjectResponse;
      const people = _post.properties.Writer;
      if (people.type !== 'people') {
        return null;
      }
      return people.people.at(0);
    })();
    const thumbnailUrl = (() => {
      const _post = post as PageObjectResponse;
      const thumb = _post.properties.thumb;
      if (thumb.type !== 'url') {
        return null;
      }
      return thumb.url;
    })();
    const seriesCategory = (() => {
      const _post = post as PageObjectResponse;
      const _seriesCategory = _post.properties.SeriesCategory;
      if (_seriesCategory.type !== 'multi_select') {
        return null;
      }
      return _seriesCategory.multi_select.at(0)?.name;
    })();
    const officialBlogSeriesCategory = (() => {
      const _post = post as PageObjectResponse;
      const _officialBlogSeriesCategory = _post.properties.OfficialBlogSeriesCategory;
      if (_officialBlogSeriesCategory.type !== 'multi_select') {
        return null;
      }
      return _officialBlogSeriesCategory.multi_select.at(0)?.name;
    })();
    const subTitle = (() => {
      const _post = post as PageObjectResponse;
      const _subTitle = _post.properties.subTitle;
      if (_subTitle.type !== 'rich_text') {
        return null;
      }
      return _subTitle.rich_text.at(0)?.plain_text;
    })();
    return {
      id: post.id,
      createdTime,
      lastEditedTime,
      dateLocale: createdTime?.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
      slug,
      title,
      subTitle,
      status: postStatus,
      writer,
      lang,
      seriesCategory,
      officialBlogSeriesCategory,
      thumbnailUrl,
    };
  });

  return seriesItems;
}
