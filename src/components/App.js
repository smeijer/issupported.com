import React from 'react';
import {
  getUserAgentRegExp,
  defaultOptions,
} from 'browserslist-useragent-regexp';

import ChromeIcon from 'url:~node_modules/browser-logos/src/chrome/chrome.svg';
import FirefoxIcon from 'url:~node_modules/browser-logos/src/firefox/firefox.svg';
import EdgeIcon from 'url:~node_modules/browser-logos/src/edge/edge.svg';
import OperaIcon from 'url:~node_modules/browser-logos/src/opera/opera.svg';
import SafariIcon from 'url:~src/icons/safari.svg';

const options = {
  ...defaultOptions,
  browsers: [`last 1 version`, `> 1%`, `IE 10`],
};

const supported = getUserAgentRegExp(options);
const isSupported = supported.test(navigator.userAgent);

const browsers = [
  { name: 'Chrome', icon: ChromeIcon, url: 'https://chrome.com' },
  { name: 'Firefox', icon: FirefoxIcon, url: 'https://firefox.com' },
  { name: 'Edge', icon: EdgeIcon, url: 'https://microsoft.com/edge' },
  { name: 'Safari', icon: SafariIcon, url: 'https://apple.com/safari' },
  { name: 'Opera', icon: OperaIcon, url: 'https://opera.com' },
];

function takeRandom(array, count) {
  const result = [...array];

  while (result.length > count) {
    const idx = Math.floor(Math.random() * result.length);
    result.splice(idx, 1);
  }

  return result;
}

function BrowserBox({ name, icon, url }) {
  return (
    <a className="box" href={url}>
      <img className="icon" src={icon} />
      <span className="name">{name}</span>
    </a>
  );
}

const messages = {
  unsupported: {
    heading: '',
    message:
      'We no longer support this browser. Update it to get the best experience and enjoy our latest features.',
  },

  supported: {
    heading: `You're awesome!`,
    message:
      'Your browser is up-to-date, which means you can use our latest features. Enjoy!',
  },
};

function App() {
  const { heading, message } = isSupported
    ? messages.supported
    : messages.unsupported;

  return (
    <div className="dialog sm:max-w-xl sm:h-auto sm:pt-32">
      <div className="max-w-xs">
        <h1>{heading}</h1>
        <p>{message}</p>

        <div className="suggestions">
          {takeRandom(browsers, 3).map((x) => (
            <BrowserBox key={x.name} {...x} />
          ))}
        </div>

        <button className="cta">Enjoy</button>
      </div>
    </div>
  );
}

export default App;
