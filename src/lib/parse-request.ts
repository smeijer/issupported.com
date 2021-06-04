import { GetServerSidePropsContext } from 'next';

import { getBrowsers } from './suggestions';
import { check } from './support';

export function getVisitorData(context: GetServerSidePropsContext) {
  const userAgent = context.req.headers['user-agent'];
  const { browsers = null, redirect = null, slug } = context.query;

  const host = (Array.isArray(slug) ? slug[0] : slug) || null;

  let visitor;
  try {
    visitor = check(userAgent, browsers || 'defaults');
  } catch {
    // fall back to default query if the provided one isn't valid
    visitor = check(userAgent, 'defaults');
  }

  const suggestions = getBrowsers(visitor.os.name);

  return { host, suggestions, redirect, visitor };
}
