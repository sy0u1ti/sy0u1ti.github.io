'use strict';

const pagination = require('hexo-pagination');

function visiblePosts(posts) {
  return posts.filter(post => post.indexing !== false);
}

function sortVisiblePosts(posts, orderBy) {
  return visiblePosts(posts).sort(orderBy);
}

hexo.extend.generator.register('index', function(locals) {
  const config = this.config;
  const posts = sortVisiblePosts(locals.posts, config.index_generator.order_by);

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
    const posts = sortVisiblePosts(category.posts, orderBy);
    if (!posts.length) return result;

    const data = pagination(category.path, posts, {
      perPage,
      layout: ['category', 'archive', 'index'],
      format: `${paginationDir}/%d/`,
      data: {
        category: category.name
      }
    });

    return result.concat(data);
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
    const posts = sortVisiblePosts(tag.posts, orderBy);
    if (!posts.length) return result;

    const data = pagination(tag.path, posts, {
      perPage,
      layout: ['tag', 'archive', 'index'],
      format: `${paginationDir}/%d/`,
      data: {
        tag: tag.name
      }
    });

    return result.concat(data);
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

hexo.extend.generator.register('archive', function(locals) {
  const { config } = this;
  let archiveDir = config.archive_dir;
  const paginationDir = config.pagination_dir || 'page';
  const allPosts = sortVisiblePosts(locals.posts, config.archive_generator.order_by || '-date');
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

  allPosts.forEach(post => {
    const date = post.date;
    const year = date.year();
    const month = date.month() + 1;

    if (!Object.prototype.hasOwnProperty.call(posts, year)) {
      posts[year] = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ];
    }

    posts[year][0].push(post);
    posts[year][month].push(post);

    if (config.archive_generator.daily) {
      const day = date.date();
      if (!Object.prototype.hasOwnProperty.call(posts[year][month], 'day')) {
        posts[year][month].day = {};
      }

      (posts[year][month].day[day] || (posts[year][month].day[day] = [])).push(post);
    }
  });

  const { Query } = this.model('Post');
  const years = Object.keys(posts);

  for (const yearKey of years) {
    const year = +yearKey;
    const data = posts[year];
    const yearPath = `${archiveDir}${year}/`;
    if (!data[0].length) continue;

    generate(yearPath, new Query(data[0]), { year });

    if (!config.archive_generator.monthly && !config.archive_generator.daily) continue;

    for (let month = 1; month <= 12; month++) {
      const monthData = data[month];
      if (!monthData.length) continue;

      if (config.archive_generator.monthly) {
        generate(`${yearPath}${month.toString().padStart(2, '0')}/`, new Query(monthData), {
          year,
          month
        });
      }

      if (!config.archive_generator.daily) continue;

      for (let day = 1; day <= 31; day++) {
        const dayData = monthData.day[day];
        if (!dayData || !dayData.length) continue;
        generate(
          `${yearPath}${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/`,
          new Query(dayData),
          { year, month, day }
        );
      }
    }
  }

  return result;
});
