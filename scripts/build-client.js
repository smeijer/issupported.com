const { readFileSync, writeFileSync, copy, remove } = require('fs-extra');
const { resolve, join } = require('path');
const { build } = require('./build');
const { openInBrowser } = require('@parcel/utils');

async function main() {
  const dest = resolve('dist/client');
  await remove(dest);

  const entries = ['src/styles/app.pcss'];

  const parcel = await build({
    entries,
    dest: 'dist/client',
    port: 1234,
  });

  await Promise.all([
    copy('_redirects', join(dest, '_redirects')),
    copy('.well-known', join(dest, '.well-known')),
    copy(
      'node_modules/browser-logos/src/chrome/chrome.svg',
      join(dest, 'chrome.svg'),
    ),
    copy(
      'node_modules/browser-logos/src/firefox/firefox.svg',
      join(dest, 'firefox.svg'),
    ),
    copy(
      'node_modules/browser-logos/src/edge/edge.svg',
      join(dest, 'edge.svg'),
    ),
    copy(
      'node_modules/browser-logos/src/opera/opera.svg',
      join(dest, 'opera.svg'),
    ),
  ]);

  const safari = readFileSync(
    'node_modules/browser-logos/src/safari-ios/safari-ios.svg',
  )
    .toString()
    .replace(/<rec.*?\/>/, '');

  writeFileSync(join(dest, 'safari.svg'), safari);

  if (parcel.watching) {
    openInBrowser(`http://localhost:${parcel.config.serve.port}`);
  }
}

main();
