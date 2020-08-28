module.exports.HtmlPage = ({ title, content, className }) => `
<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#" lang="en" itemscope itemtype="http://schema.org/WebPage">
  <head>
    <meta charset="utf-8" />
    <meta name="title" content="Is Supported" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">
    <link href="/app.css" rel="stylesheet">
    
    <link rel="icon" type="image/png" sizes="32x32" href="/issupported-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/issupported-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/issupported-16x16.png">

    <meta name="keywords" content="browser, webbrowser, upgrade browser, browser bar, browser banner, update browser, choice, change browser, firefox, safari, opera, firefox, upgrade internet explorer, internet explorer update, ie, safari, konqueror, deprecation warning" />
    <meta name="description" content="Check if your browser is still up to date, and supported by your favorite websites." />
    
    <!-- robots -->
    <meta name="distribution" content="global" />
    <meta name="robots" content="index,nofollow" />
    <meta name="revisit-after" content="7 days" />

    <meta name="language" content="en" />
    <link rel="canonical" href="https://issupported.com" />

    <!-- Schema.org -->
    <meta itemprop="name" content="Is Supported" />
    <meta itemprop="description" content="Check if your browser is still up to date, and supported by your favorite websites." />
    <meta itemprop="image" content="/preview.png" />
    <meta property="image:alt" content="browser support check and upgrade suggestions" />

    <!-- Facebook OpenGraph -->
    <meta property="og:url" content="https://issupported.com" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Is Supported" />
    <meta property="og:image" content="/preview.png" />
    <meta property="og:image:alt" content="browser support check and upgrade suggestions" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="675" />
    <meta property="og:description" content="Browser support check and upgrade suggestions." />
    <meta property="og:site_name" content="Is Supported" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter OpenGraph -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@meijer_s" />
    <meta name="twitter:url" content="https://issupported.com" />
    <meta name="twitter:title" content="Is Supported" />
    <meta name="twitter:description" content="Browser support check and upgrade suggestions." />
    <meta name="twitter:image" content="../public/site.jpg" />
    <meta name="twitter:image:alt" content="Is Supported" />

    <title>${title}</title>
  </head>
  <body>
    <div id="app" class="${className || ''}">
        <div class="dialog">
            <div class="content">
                ${content}
            </div>
            <div class="menu">
                <a href="/">check</a>
                <span>|</span> 
                <a href="/report">report</a>
                <span>|</span> 
                <a href="/api">developers</a>
            </div>
        </div>
    </div>
    
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-176731605-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'UA-176731605-1');
    </script>
  </body>
</html>
`;
