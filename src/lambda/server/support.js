const {
  getUserAgentRegExp,
  defaultOptions,
} = require('browserslist-useragent-regexp');

const bowser = require('bowser');

function getRegex(browsers) {
  return getUserAgentRegExp({
    ...defaultOptions,
    allowHigherVersions: true,
    browsers,
  });
}

module.exports.getRegex = getRegex;

module.exports.check = function (userAgent, browsers) {
  const supported = getRegex(browsers);

  return {
    supported: supported.test(userAgent),
    userAgent,
    ...bowser.parse(userAgent),
  };
};
