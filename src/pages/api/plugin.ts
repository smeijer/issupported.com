import { NextApiRequest, NextApiResponse } from 'next';

import { getRegex } from '../../lib/support';

// We should be able to cache it, as the scripts depend on the GET param,
// but the check is still being done at the client.
const CACHE_MAX_AGE = 7 * 24 * 3600;

const BACK_OFF_DURATION = 7 * 24 * 60 * 60 * 1000;

function compact(val) {
  return val.toString().replace(/[\s\n]+/g, ' ');
}

function createScript(browsers: string) {
  const regex = getRegex(browsers);
  const b = browsers ? encodeURIComponent(browsers) : '';

  // language=JS
  return `(
      function () {
        var v='_bis=p',p=document.cookie.indexOf(v)>-1,s=${regex}.test(navigator.userAgent),l=location,h=l.hostname;

        if (!p && !s) {          
          var e = new Date((new Date).getTime() + ${BACK_OFF_DURATION}).toGMTString();
          document.cookie = v+';path=/; expires='+e+'; domain='+h+';';
          l.href='${process.env.NEXT_PUBLIC_BASE_URL}/'+h.replace(/^www./, '')+'?browsers=${b}&redirect='+l.href;
        }
      }
    )()`;
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(404).end();
  }

  try {
    const browsers = Array.isArray(req.query.browsers)
      ? req.query.browsers[1]
      : req.query.browsers;
    const script = compact(createScript(browsers || 'defaults'));

    console.log(
      `created script | used: ${browsers || 'defaults'} | provided ${browsers}`,
    );

    res.setHeader('Cache-Control', `public, max-age=${CACHE_MAX_AGE}`);
    res.setHeader('Content-Type', 'text/javascript');
    res.status(200).end(script);
  } catch (e) {
    console.log();
    res.status(422).end(e.message);
  }
}

export default handler;
