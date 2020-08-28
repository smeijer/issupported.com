const { messages } = require('./messages');

const browsers = [
  { name: 'Chrome', icon: '/chrome.svg', url: 'https://chrome.com' },
  { name: 'Firefox', icon: '/firefox.svg', url: 'https://firefox.com' },
  { name: 'Edge', icon: '/edge.svg', url: 'https://microsoft.com/edge' },
  { name: 'Safari', icon: '/safari.svg', url: 'https://apple.com/safari' },
  { name: 'Opera', icon: '/opera.svg', url: 'https://opera.com' },
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
function getBrowsers(os) {
  let supportedBrowsers = [...browsers];

  console.log(os);
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

function BrowserBox({ name, icon, url }) {
  return `
    <a class="box" href="${url}">
      <img src="${icon}" />
      <div>${name}</div>
    </a>
  `;
}

function CallToAction({ content, url }) {
  return `
    <a href="${url || '/'}" class="cta">${content}</a>
  `;
}

module.exports.Debug = (data) => `
  <pre>
      ${JSON.stringify(data, null, '  ')}
  </pre>
`;

const logo = '';
// const logo = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';

module.exports.SupportedPage = ({ host, supported, browser, os, redirect }) => {
  let { heading, message, button } = supported
    ? messages.en.supported
    : messages.en.unsupported;

  if (!host) {
    const [version] = browser.version.split('.');
    const osVersion = os.versionName || os.version || '';

    heading = `${browser.name} ${version} on ${os.name} ${osVersion}`;
    message = supported
      ? `Your browser is up to date, and should be supported by most websites`
      : `You might want to update to a newer version, or try some other browser.`;
    button = false;
  }

  return `
    <div>
      ${logo ? `<img class="logo" src="${logo}" />` : ''}
      <h1>${heading}</h1>
      <p>${message}</p>
      <div class="suggestions">
          ${getBrowsers(os.name).map(BrowserBox).join('')}
      </div>
      
      ${
        button
          ? CallToAction({
              url: redirect,
              content: supported ? `${button} ${host}` : button,
            })
          : ''
      }
    </div>
  `;
};

const join = (...values) => values.filter(Boolean).join(' ');

module.exports.DetailPage = ({ supported, engine, browser, os, platform }) => {
  const [version] = browser.version.split('.');

  const osVersion = os.versionName || os.version || '';
  const heading = `${browser.name} ${version} on ${os.name} ${osVersion}`;
  const message = supported
    ? `Your browser is up to date, and should be supported by most websites`
    : `You might want to update to a newer version, or try alternatives.`;

  return `
    <div>
      <h1>${heading}</h1>
      <p>${message}</p>
      <div class="suggestions">
        <pre>browser:   ${join(browser.name, browser.version)}
engine:    ${join(engine.name, engine.version)}
os:        ${join(os.name, os.versionName || os.version)}
platform:  ${join(platform.type)}
screen:
window:
px ratio:
</pre>
      <script type="text/javascript">(function() {
        var e = document.querySelector('pre'); var s = screen; var w = window; var dp = (w.devicePixelRatio || 1);
        e.innerText = e.innerText.replace(/^screen:/m, 'screen:    ' + Math.floor(s.width * dp) + '×' + Math.floor(s.height * dp) + ' ('+s.pixelDepth+'bit)');
        e.innerText = e.innerText.replace(/^window:/m, 'window:    ' + w.innerWidth + '×' + w.innerHeight);
        e.innerText = e.innerText.replace(/^px ratio:/m, 'px ratio:  1:' + dp);
      })()</script>
      </div>     
    </div>
  `;
};

// should we multiply with window.devicePixelRatio for retina screens?
