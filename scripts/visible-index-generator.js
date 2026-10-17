'use strict';

// 站点列表策略：专栏（topic Collection）的成员只在专栏页和归档中展示，
// 不进入博客首页、分类与标签的列表分页。v1 使用 front matter 的 indexing:false
// 实现同样的效果；v2 中 visibility.listed 会同时把成员移出专栏目录，因此改用
// collection 归属判断。

const pagination = require('hexo-pagination');

function isCollectionMember(post) {
  const collection = post && post.collection;
  return Boolean(collection && typeof collection === 'object' && collection.profile && collection.id);
}

function visiblePosts(posts) {
  return posts.filter(post => !isCollectionMember(post));
}

function sortPosts(posts, orderBy) {
  return visiblePosts(posts).sort(orderBy);
}

hexo.extend.generator.register('index', function(locals) {
  const config = this.config;
  const posts = sortPosts(locals.posts, config.index_generator.order_by);

  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

  const paginationDir = config.index_generator.pagination_dir || config.pagination_dir || 'page';
  const path = config.index_generator.path || '';

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: config.index_generator.layout || ['index', 'archive'],
    format: `${paginationDir}/%d/`,
    data: {
      __index: true
    }
  });
});

hexo.extend.generator.register('category', function(locals) {
  const config = this.config;
  const perPage = config.category_generator.per_page;
  const paginationDir = config.pagination_dir || 'page';
  const orderBy = config.category_generator.order_by || '-date';

  return locals.categories.reduce((result, category) => {
    const posts = sortPosts(category.posts, orderBy);
    if (!posts.length) return result;

    return result.concat(pagination(category.path, posts, {
      perPage,
      layout: ['category', 'archive', 'index'],
      format: `${paginationDir}/%d/`,
      data: {
        category: category.name
      }
    }));
  }, []);
});

hexo.extend.generator.register('tag', function(locals) {
  const config = this.config;
  const perPage = config.tag_generator.per_page;
  const paginationDir = config.pagination_dir || 'page';
  const orderBy = config.tag_generator.order_by || '-date';
  const tags = locals.tags;
  let tagDir;

  const pages = tags.reduce((result, tag) => {
    const posts = sortPosts(tag.posts, orderBy);
    if (!posts.length) return result;

    return result.concat(pagination(tag.path, posts, {
      perPage,
      layout: ['tag', 'archive', 'index'],
      format: `${paginationDir}/%d/`,
      data: {
        tag: tag.name
      }
    }));
  }, []);

  if (config.tag_generator.enable_index_page) {
    tagDir = config.tag_dir;
    if (tagDir[tagDir.length - 1] !== '/') {
      tagDir += '/';
    }

    pages.push({
      path: tagDir,
      layout: ['tag-index', 'tag', 'archive', 'index'],
      posts: visiblePosts(locals.posts),
      data: {
        base: tagDir,
        total: 1,
        current: 1,
        current_url: tagDir,
        posts: visiblePosts(locals.posts),
        prev: 0,
        prev_link: '',
        next: 0,
        next_link: '',
        tags
      }
    });
  }

  return pages;
});

// 归档保留全部文章（与 v1 站点行为一致）。
hexo.extend.generator.register('archive', function(locals) {
  const { config } = this;
  let archiveDir = config.archive_dir;
  const paginationDir = config.pagination_dir || 'page';
  const allPosts = locals.posts.sort(config.archive_generator.order_by || '-date');
  const perPage = config.archive_generator.per_page;
  const result = [];

  if (!allPosts.length) return;

  if (archiveDir[archiveDir.length - 1] !== '/') archiveDir += '/';

  function generate(path, posts, options = {}) {
    options.archive = true;

    result.push(...pagination(path, posts, {
      perPage,
      layout: ['archive', 'index'],
      format: `${paginationDir}/%d/`,
      data: options
    }));
  }

  generate(archiveDir, allPosts);

  if (!config.archive_generator.yearly) return result;

  const posts = {};
  const { Query } = this.model('Post');

  allPosts.forEach(post => {
    const date = post.date;
    const year = date.year();
    const month = date.month() + 1;

    if (!Object.prototype.hasOwnProperty.call(posts, year)) {
      posts[year] = Array.from({ length: 13 }, () => []);
    }

    posts[year][0].push(post);
    posts[year][month].push(post);
  });

  for (const yearKey of Object.keys(posts)) {
    const year = +yearKey;
    const data = posts[year];
    const yearPath = `${archiveDir}${year}/`;
    if (!data[0].length) continue;

    generate(yearPath, new Query(data[0]), { year });

    if (!config.archive_generator.monthly) continue;

    for (let month = 1; month <= 12; month++) {
      if (!data[month].length) continue;
      generate(`${yearPath}${month.toString().padStart(2, '0')}/`, new Query(data[month]), { year, month });
    }
  }

  return result;
});
