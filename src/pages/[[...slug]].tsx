import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import { Menu } from '../components/menu';
import SocialHead from '../components/social-head';
import { absoluteUrl } from '../lib/absolute-url';
import { en } from '../lib/messages';
import { getVisitorData } from '../lib/parse-request';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: getVisitorData(context),
  };
}

export default function Home({ suggestions, redirect, visitor, host }) {
  const supported = visitor.supported;
  const msg = supported ? en.supported : en.unsupported;
  const message = host ? msg.message_embed : msg.message;
  const color = supported ? 'blue' : 'red';

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
          <title>Check if your browser is still supported</title>
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
              <h1 className="text-xl text-gray-900">{msg.heading}</h1>
              <p className="pt-4 text-center text-gray-600">{message}</p>

              <div className="flex justify-between select-none my-12">
                {suggestions.map((browser) => (
                  <a
                    key={browser.name}
                    href={browser.url}
                    className="bg-gray-warm rounded flex flex-col justify-center items-center p-4 font-light transition transform hover:scale-105 hover:shadow"
                  >
                    <img
                      className="mb-2 flex-none w-16"
                      src={`/browsers/${browser.icon}`}
                      alt=""
                    />
                    <span>{browser.name}</span>
                  </a>
                ))}
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
