module.exports = {
  target: 'serverless',
  poweredByHeader: false,

  async rewrites() {
    return [{ source: '/plugin', destination: '/api/plugin' }];
  },
};
