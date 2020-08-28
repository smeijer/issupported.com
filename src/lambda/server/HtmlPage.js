module.exports.HtmlPage = ({ title, content, className }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">
    <link href="/styles/app.css" rel="stylesheet">
    
    <title>${title}</title>
  </head>
  <body>
    <div id="app" class="${className || ''}">
        <div class="dialog">
            <div>
                ${content}
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
