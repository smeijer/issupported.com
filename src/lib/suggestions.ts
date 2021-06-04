const browsers = [
  { name: 'Chrome', icon: 'chrome.svg', url: 'https://chrome.com' },
  { name: 'Firefox', icon: 'firefox.svg', url: 'https://firefox.com' },
  { name: 'Edge', icon: 'edge.svg', url: 'https://microsoft.com/edge' },
  { name: 'Safari', icon: 'safari.svg', url: 'https://apple.com/safari' },
  { name: 'Opera', icon: 'opera.svg', url: 'https://opera.com' },
];

function takeRandom(array, count) {
  const options = [...array];
  const result = [];

  while (result.length < count) {
    const idx = Math.floor(Math.random() * options.length);
    result.push(options[idx]);
    options.splice(idx, 1);
  }

  return result;
}

// https://github.com/lancedikson/bowser/blob/d1a6532d82757d8e24979833ab6830a234b174b0/src/constants.js#L93
export function getBrowsers(os) {
  let supportedBrowsers = [...browsers];

  // safari is only supported on macOS and iOS
  if (os !== 'macOS' && os !== 'iOS') {
    supportedBrowsers = supportedBrowsers.filter((x) => x.name !== 'Safari');

    // Edge is only supported on macOS, iOS, Windows and Android (no linux)
    if (os !== 'Windows' && os !== 'Windows Phone' && os !== 'Android') {
      supportedBrowsers = supportedBrowsers.filter((x) => x.name !== 'Edge');
    }
  }

  return takeRandom(supportedBrowsers, 3);
}
