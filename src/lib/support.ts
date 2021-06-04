import bowser from 'bowser';
import {
  defaultOptions,
  getUserAgentRegExp,
} from 'browserslist-useragent-regexp';

export function getRegex(browsers) {
  return getUserAgentRegExp({
    ...defaultOptions,
    allowHigherVersions: true,
    browsers,
  });
}

export function check(userAgent, browsers) {
  const supported = getRegex(browsers);

  return {
    supported: supported.test(userAgent),
    userAgent,
    ...bowser.parse(userAgent),
    list: browsers,
  };
}
