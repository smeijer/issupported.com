import withTwindDocument from '@twind/next/shim/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

import twindConfig from '../../twind.config';
import GoogleAnalytics from '../components/google-analytics';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />

        <body className="min-h-screen bg-gray-100">
          <Main />
          <NextScript />
          {process.env.NEXT_PUBLIC_GA_TRACKING_ID ? (
            <GoogleAnalytics gtag={process.env.NEXT_PUBLIC_GA_TRACKING_ID} />
          ) : null}
        </body>
      </Html>
    );
  }
}

export default withTwindDocument(twindConfig, MyDocument);
