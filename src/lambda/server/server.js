const { check } = require('./support');
const { SupportedPage } = require('./Pages');
const { HtmlPage } = require('./HtmlPage');
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

const backOffDuration = 7 * 24 * 60 * 60 * 1000;

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
      function () {
        var v = '_bis=p', p = document.cookie.indexOf(v) > -1, s = ${regex}.test(navigator.userAgent), l = location;

        if (!p && !s) {
          var h = l.hostname.split('.').reverse();
          h = h[1] ? h[1]+'.'+h[0] : h[0];
          
          var e = new Date((new Date).getTime() + ${backOffDuration}).toGMTString();
          document.cookie = v+'; path=/; expires='+e+'; domain='+h+';';
          l.href='${h}/'+l.hostname.replace(/^www./, '')+'?browsers=${b}&redirect='+l.href;
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

  switch (host) {
    case 'report': {
      title = 'report @ Is Supported';
      body = DetailPage;
      break;
    }

    case 'api': {
      title = 'api @ Is Supported';
      body = ApiPage;
      break;
    }

    default: {
      title = 'Is Supported';
      body = SupportedPage;
    }
  }

  const content = body({ host, redirect, ...browser });

  const page = HtmlPage({
    title,
    content,
    className: host === 'api' ? 'api' : browser.supported ? '' : 'unsupported',
  });

  return callback(null, html(page));
}

module.exports = { handler };
