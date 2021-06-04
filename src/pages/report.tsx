import Head from 'next/head';

import { Menu } from '../components/menu';
import SocialHead from '../components/social-head';
import { absoluteUrl } from '../lib/absolute-url';
import { en } from '../lib/messages';
import { getVisitorData } from '../lib/parse-request';

export async function getServerSideProps(context) {
  return {
    props: getVisitorData(context),
  };
}

const join = (...values) => values.filter(Boolean).join(' ');

export default function Report({ redirect, visitor, host }) {
  const supported = visitor.supported;
  const msg = supported ? en.supported : en.unsupported;
  const message = host ? msg.message_embed : msg.message;
  const color = supported ? 'blue' : 'red';

  const { browser, engine, os, platform } = visitor;
  const [version] = browser.version.split('.');

  const osVersion = os.versionName || os.version || '';
  const heading = `${browser.name} ${version} on ${os.name} ${osVersion}`;

  const client: { screen?: string; window?: string; pixelRatio?: string } = {};

  if (typeof window !== 'undefined') {
    const dp = window.devicePixelRatio || 1;

    Object.assign(client, {
      screen:
        Math.floor(screen.width * dp) +
        '×' +
        Math.floor(screen.height * dp) +
        ' (' +
        screen.pixelDepth +
        'bit)',
      window: window.innerWidth + '×' + window.innerHeight,
      pixelRatio: `1:${dp}`,
    });
  }

  return (
    <>
      <SocialHead
        color="#D72323"
        name="issupported.com"
        title="Is Supported - Check if your browser is up to date."
        description="Check if your browser is still supported by your favorite websites."
        image={absoluteUrl('/social.png')}
        icons={[
          absoluteUrl('/logo-24.png'),
          absoluteUrl('/logo-48.png'),
          absoluteUrl('/logo-96.png'),
        ]}
      />

      <div className="w-screen h-screen relative bg-gray-100">
        <Head>
          <title>Browser details</title>
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <main className="w-full h-full flex items-center justify-center flex-col">
          <div className="max-w-xl w-full text-right mb-2 absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto">
            <Menu />
          </div>

          <div
            className={`h-full flex items-center justify-center sm:block sm:h-auto bg-white rounded shadow border-t-4 border-${color}-600 sm:pt-32 sm:pb-16 max-w-xl w-full`}
          >
            <div className="max-w-xs mx-auto text-center">
              <h1 className="text-xl text-gray-900">{heading}</h1>
              <p className="pt-4 text-center text-gray-600">{message}</p>

              <div className="text-left flex my-12 bg-gray-warm rounded p-4 font-light font-mono whitespace-pre select-all text-sm">
                {`
browser:   ${join(browser.name, browser.version)}
engine:    ${join(engine.name, engine.version)}
os:        ${join(os.name, os.versionName || os.version)}
platform:  ${platform.type}
screen:    ${client.screen}
window:    ${client.window}
px ratio:  ${client.pixelRatio}
`.trim()}
              </div>

              {host && redirect ? (
                <a
                  href={redirect}
                  className={`bg-${color}-600 rounded p-2 text-white block w-full truncate transform transition hover:scale-105 hover:shadow`}
                >
                  {supported ? `${msg.button} ${host}` : msg.button}
                </a>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
