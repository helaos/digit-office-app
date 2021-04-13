let proxyObj = {}

proxyObj['/'] = {
  ws: false,
  target: 'http://localhost:2039',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}
