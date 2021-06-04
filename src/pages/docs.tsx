import Head from 'next/head';

import { Menu } from '../components/menu';
import SocialHead from '../components/social-head';
import { absoluteUrl } from '../lib/absolute-url';

function Code({ children, block }: { block?: boolean; children: string }) {
  if (!block && !children.includes('\n')) {
    return (
      <code className="mx-1 px-1 text-sm font-mono bg-gray-warm inline relative whitespace-nowrap z-0">
        <span className="absolute -top-px left-0 w-full h-full ring-2 ring-gray-warm bg-gray-warm rounded -z-10" />
        {children.trim()}
      </code>
    );
  }

  return (
    <code className="max-w-screen overflow-x-auto text-sm py-4 font-mono bg-gray-warm block whitespace-pre -mx-8 px-8">
      {children.trim()}
    </code>
  );
}

export default function Docs() {
  const issupported = (
    <a className="text-blue-600" href="https://issupported.com">
      issupported
    </a>
  );

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
          <title>Is Supported, Developer API</title>
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <main className="w-full h-full flex items-center flex-col sm:pt-16">
          <div className="max-w-xl w-full text-right mb-2 absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto">
            <Menu />
          </div>

          <div className="bg-white rounded shadow border-t-4 border-gray-600 text-gray-800 pt-32 pb-16 px-8 space-y-4 max-w-xl w-full">
            <h1 className="text-xl text-gray-900 w-full text-center">
              Developer API
            </h1>

            <p>
              {issupported} uses the famous{' '}
              <a
                className="text-blue-600"
                href="https://github.com/browserslist/browserslist"
              >
                browserslist
              </a>{' '}
              to determine if the users' browser is still supported. Having an
              automated way to handle browser support is nice. But wouldn't it
              be awesome to let the user know that they should upgrade as well?
              <br />
              <br />
              This is where {issupported} comes in.
            </p>

            <h2 id="script-tag" className="text-lg pt-8">
              <a href="#script-tag">Script tag</a>
            </h2>

            <p>
              {issupported} can be integrated in your own site, by adding a
              script tag.
            </p>
            <Code>{`
<script
  type="text/javascript"
  src="https://issupported.com/plugin?browsers=…"
></script>
`}</Code>

            <p>
              The script url accepts a <Code>browserslist</Code> query as{' '}
              <Code>browsers</Code> parameter. When you don't provide it, it
              will default to <Code>defaults</Code>.
            </p>

            <Code block>{`/plugin?browsers=defaults, not IE 11`}</Code>

            <h2 id="manual" className="text-lg pt-8">
              <a href="#manual">Manual redirection</a>
            </h2>

            <p>
              It's also possible to manually send the user to {issupported}. For
              example because you need some info for a github issue. In that
              case, it's recommended to send them to <Code>/report</Code>. They
              can then copy the results, and paste them in the issue.
            </p>

            <Code block>https://issupported.com/report</Code>

            <p>
              Please consider adding this link and instructions to your github
              issue template.
            </p>

            <h2 id="back-link" className="text-lg pt-8">
              <a href="#back-link">Back Linking</a>
            </h2>
            <p>
              The last option that we provide, is a semi branded page. This
              option can be used to add a link to your website, which sends the
              user to {issupported}. By providing a <Code>domain</Code> and{' '}
              <Code>redirect</Code> parameter, the user will find their way back
              to your site.
            </p>

            <Code>{`
<a 
  href="https://issupported.com/{domain}?redirect={redirect}"
>browser check</a>`}</Code>

            <p>
              Note that <Code>domain</Code> is the label that will be displayed
              on the "back button", while <Code>redirect</Code> is the page
              where the user is send to when they click that button.
            </p>

            <p>
              The back link also supports the <Code>browsers</Code> argument
              just like with the <a href="#script-tag">script tag</a> above.
              When the <Code>browsers</Code> parameter is absent, it will
              default to <Code>defaults</Code>.
            </p>

            <h2 id="examples" className="text-lg pt-8">
              <a href="#examples">Examples</a>
            </h2>
            <p>
              Let's hope that you're not really using IE 6, as these examples
              depend on the fact that you're not.
            </p>

            <p>
              Open the{' '}
              <a
                className="text-blue-600"
                href="/example.com?browsers=IE%206&redirect=docs%23examples"
              >
                IE 6 only
              </a>{' '}
              page to see what the page looks like when it recommends updating.
              As the link has a <Code>browsers=IE 6</Code>
              query defined, it will only let IE 6 pass. All other browsers will
              result in the advise to update.
            </p>

            <p>
              To see what the "all fine" page looks like, open the{' '}
              <a
                className="text-blue-600"
                href="/example.com?browsers=not%20IE%206&redirect=docs%23examples"
              >
                all but IE 6
              </a>{' '}
              page. This link has a <Code>browsers=not IE 6</Code> query
              defined, it will only advise to update to those that are still
              using IE 6. Because of that, you should see a positive result.
            </p>

            <p>
              Both examples have a <Code>redirect</Code> defined that goes back
              to this page, and use <Code>example.com</Code> as{' '}
              <Code>domain</Code>. Clicking the big action button, should bring
              you right back here.
            </p>
          </div>
          <div className="hidden sm:block h-16 flex-none w-full" />
        </main>
      </div>
    </>
  );
}
