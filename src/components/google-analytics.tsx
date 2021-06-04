import * as React from 'react';

function GoogleAnalytics({ gtag }: { gtag: string }) {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag}');
          `,
        }}
      />
    </>
  );
}

export default GoogleAnalytics;
