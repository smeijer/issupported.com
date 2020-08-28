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
      <img alt="${name} logo" src="${icon}" />
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

const issupported = `<a href="https://issupported.com">issupported</a>`;
module.exports.ApiPage = () => `
  <div>
    <h1>Developer API</h1>
    <div class="left api">
      <p>${issupported} uses the famous <a href="https://github.com/browserslist/browserslist">browserslist</a>
         to determine if the users' browser is still supported. Having an automated
          way to handle browser support is nice. But wouldn't it be awesome to let
          the user know that they should upgrade as well?<br /><br />This is where ${issupported} comes in.
      </p>
      <h2 id="script-tag"><a href="#script-tag">Script tag</a></h2>
      <p>
        ${issupported} can be integrated in your own site, by adding a script tag.</p>
      <pre>&lt;script 
  type="text/javascript"
  src="https://issupported.com/plugin?browsers=…"
&gt;&lt;/script&gt;</pre>

       <p>The script url accepts a <code>browserslist</code> query as <code>browsers</code> parameter.
       When you don't provide it, it will default to <code>defaults</code>.</p>
       
       <pre>/plugin?browsers=defaults, not IE 11</pre>
        
        <h2 id="manual"><a href="#manual">Manual redirection</a></h2>
        <p>It's also possible to manually send the user to ${issupported}. For 
        example because you need some info for a github issue. In that case, it's 
        recommended to send them to <code>/report</code>. They can then copy the 
        results, and paste them in the issue.
        
        <pre>https://issupported.com/report</pre>
        
        <p>Please consider adding this link and instructions to your github issue template.</p>
        
        <h2 id="back-link"><a href="#back-link">Back Linking</a></h2>
        <p>The last option that we currently provide, is a semi branded page. This
        option can be used to add a link to your website, which sends the user
        to ${issupported}. By providing a <code>domain</code> and <code>redirect</code> parameter,
        the user will find their way back.</p>
        
        <pre>&lt;a 
  href="https://issupported.com/{domain}?redirect={redirect}"
&gt;browser check&lt;/a&gt;</pre>
        
        <p>Note that <code>domain</code> has a double purpose. It's the label that 
        will be displayed on the "back button". But when you don't provide the 
        <code>browsers</code> parameter (see below), we'll also try to fetch and use a
        <code>browserslist</code> file from your site. By using this convention, it might be easier to
        keep the list actual. You'll also get a nice working short link to check browser
        compatibility for your site, like: issuported.com/example.com.</p>
        
        <pre>https://{domain}/.well-known/browserslist.txt</pre>
        <p>We recommend copying the browserslist to the <code>.well-known</code> folder
         as part of your build process.</p>

        <p>The back link also supports the <code>browsers</code> argument just like with the <a href="#script-tag">script tag</a> above.
        When the <code>browsers</code> parameter is left out, and the list can't be retrieved from the <code>.well-known</code> 
        folder, it will default to <code>defaults</code>.</p>
        
        <p>Please note that <code>domain</code> should be without http or www. 
        Just something like "example.com". While <code>redirect</code> should
        be the full address. Like "https://example.com"</p>
        
        <h2 id="examples"><a href="#examples">Examples</a></h2>
        <p>Let's hope that you're not really using IE 6, as these examples depend on the fact that you're not.</p>
        
        <p>Open the <a href="/example.com?browsers=IE%206&redirect=api%23examples">IE 6 only</a>
        page to see what the page looks like, when it recommends updating. As the link has a <code>browsers=IE 6</code> 
        query defined, it will only let IE 6 pass. All other browsers will result in the advise to update.</p>
        
        <p>To see what the "all fine" page looks like, open the <a href="/example.com?browsers=not%20IE%206&redirect=api%23examples">all but IE 6</a>
        page. This link has a <code>browsers=not IE 6</code> query defined, it will only advise to update to those that
        are still using IE 6. Because of that, you should see a positive result.</p>
       
        <p>Both examples have a <code>redirect</code> defined that goes back to this page, and use <code>example.com</code> as <code>domain</code>. Clicking the big action button, should bring you right back here.</p>
      </div>
  </div>`;

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
      <script>(function() {
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
