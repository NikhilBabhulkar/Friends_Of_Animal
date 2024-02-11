module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/read-cookie',
        destination: '/api/read-cookie',
      },
    ];
  },
};
