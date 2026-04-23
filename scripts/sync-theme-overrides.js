'use strict';

const fs = require('node:fs');
const path = require('node:path');

const overrides = [
  ['layout/archive.ejs', 'theme-overrides/layout/archive.ejs'],
  ['layout/categories.ejs', 'theme-overrides/layout/categories.ejs']
];

hexo.extend.filter.register('before_generate', function() {
  for (const [themeRelativePath, projectRelativePath] of overrides) {
    const sourcePath = path.join(hexo.base_dir, projectRelativePath);
    const targetPath = path.join(hexo.theme_dir, themeRelativePath);

    if (!fs.existsSync(sourcePath)) {
      continue;
    }

    const source = fs.readFileSync(sourcePath, 'utf8');
    const target = fs.existsSync(targetPath) ? fs.readFileSync(targetPath, 'utf8') : null;

    if (target !== source) {
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, source);
    }
  }
});
