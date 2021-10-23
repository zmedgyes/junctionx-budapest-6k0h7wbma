module.exports = {
  pwa: {
    workboxOptions: {
      runtimeCaching: [
      {
        urlPattern: new RegExp('.*\.(png|jpg|svg|woff|gif)$'),
        handler: 'StaleWhileRevalidate'
      },  
      {
        urlPattern: new RegExp('.*'),
        handler: 'NetworkFirst',
      }]
    }
  }
}
