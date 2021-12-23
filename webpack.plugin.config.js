const webpack = require('webpack')

const plugin = [
  new webpack.ProgressPlugin({
          handler: (percentage, message ) => {
            console.info(percentage, message);
          },
  })
]

module.exports = plugin

