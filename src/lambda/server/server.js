const { check } = require('./support');
const { SupportedPage } = require('./Pages');
const { HtmlPage } = require('./HtmlPage');
const cookie = require('cookie');
const { getRegex } = require('./support');
const fetch = require('node-fetch');
const { ApiPage } = require('./Pages');
const { DetailPage } = require('./Pages');

function getHostname(event, context) {
  if (event.headers.host) {
    return `http://${event.headers.host}`;
  }

  const { netlify } = context.clientContext.custom || {};

  return JSON.parse(Buffer.from(netlify, 'base64').toString('utf-8')).site_url;
}

const html = (body, headers) => ({
  statusCode: 200,
  body: body,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/html; charset=UTF-8',
    ...headers,
  },
});

const js = (body, headers) => ({
  statusCode: 200,
  body: compact(body),
  headers: {
    'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=300',
    'Content-Type': 'text/javascript',
    ...headers,
  },
});

function compact(val) {
  return val.toString().replace(/[\s\n]+/g, ' ');
}

function extractHostname(path) {
  let hostname = path;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (hostname.includes('//')) {
    hostname = hostname.split('/')[2];
  }

  if (hostname.startsWith('www')) {
    hostname = hostname.substr(4);
  }

  //find & remove port number
  hostname = hostname.split(':')[0];

  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

function createScript(event, context) {
  const h = getHostname(event, context);
  const { browsers } = event.queryStringParameters;

  try {
    const regex = getRegex(browsers || 'defaults');
    const b = browsers ? encodeURIComponent(browsers) : '';

    console.log(
      `create script | used: ${browsers || 'defaults'} | provided ${browsers}`,
    );

    const code = `(
      function (){
        if (
          document.cookie.indexOf('browser.issupported.com=pause') === -1 && 
          !${regex}.test(navigator.userAgent)
        ) {
          location.href='${h}/'+location.hostname.replace(/^www./, '')+'?browsers=${b}&redirect='+window.location.href;
        }
      }
    )()`;

    return code;
  } catch (e) {
    return e.message;
  }
}

// supported.at/clearly.app
// we.supported.one/browser
// does.my.browser.work/for/clearly.app
// is-recent.com
// isthis.one/updated
// issupported.com
// which-browser
// what-browser

async function handler(event, context, callback) {
  const host = extractHostname(event.path.split('/')[1]);

  if (host === 'favicon.ico') {
    return callback(null, null);
  }

  if (host === 'plugin') {
    const script = createScript(event, context);
    return callback(null, js(script));
  }

  let { browsers, redirect } = event.queryStringParameters;

  const userAgent = event.headers['user-agent'];

  if (host && !browsers) {
    try {
      const res = await fetch(`https://${host}/.well-known/browserslist.txt`);
      const body = await res.text();
      browsers = body.split('\n').filter(Boolean).join(', ');
    } catch (e) {
      // void
    }
  }

  let browser;
  try {
    browser = check(userAgent, browsers || `defaults`);
  } catch {
    // fall back to default query if the provided one isn't valid
    browser = check(userAgent, `defaults`);
  }

  console.log(
    `req: host ${host} | supported ${browser.supported} | used: ${browser.list} | provided ${browsers}`,
  );

  let title;
  let body;
  let setCookie = false;

  switch (host) {
    case 'report': {
      title = 'report @ issupported.com';
      body = DetailPage;
      break;
    }

    case 'api': {
      title = 'api @ issupported.com';
      body = ApiPage;
      break;
    }

    default: {
      title = 'issupported.com';
      body = SupportedPage;
      setCookie = !!host;
    }
  }

  const content = body({ host, redirect, ...browser });

  const page = HtmlPage({
    title,
    content,
    className: host === 'api' ? 'api' : browser.supported ? '' : 'unsupported',
  });

  const informed = cookie.serialize('browser.issupported.com', 'pause', {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return callback(
    null,
    html(
      page,
      setCookie
        ? {
            'Set-Cookie': informed,
          }
        : {},
    ),
  );
}

module.exports = { handler };
