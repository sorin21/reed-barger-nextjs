const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  webpack: config => {
    // plugins is an array
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        // cacheId: "hackernextjs"
        // service worker file that's generated for us has this name service-worker.js
        // we can use this prop to name it like this offline.js 
        // filename: 'offline.js'
        //  we can minify or service worker
        // minify: true,
        // we use this prop to spcify in an array the path from files that we want to ignore
        //  we want to ignore what comes from .next folder with regex
        staticFileGlobsIgnorePatterns: [/\.next\//],
        // we have diff way of caching(3 types) in this case
        //  we will use the network first approach
        runtimeCaching: [
          {
            // here specify one of the strategy
            handler: 'networkFirst',
            // match urls that, using regex, either have the form http, https(using ?)
            urlPattern: /^https?.*/
          }
        ]

      })
    )
    return config;
  }
}