module.exports = {
  poweredByHeader: false,

  async rewrites() {
    return [{ source: '/plugin', destination: '/api/plugin' }];
  },
};
