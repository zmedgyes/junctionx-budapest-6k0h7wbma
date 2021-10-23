module.exports = {
  pwa: {
    workboxOptions: {
      exclude: [/.*index.html$/],
      runtimeCaching: [  
      {
        urlPattern: new RegExp('.*'),
        handler: 'NetworkFirst',
      }]
    }
  }
}
