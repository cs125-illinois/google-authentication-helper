const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'docs/google-authentication-helper.js',
    library: 'googleLoginHelper'
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}
