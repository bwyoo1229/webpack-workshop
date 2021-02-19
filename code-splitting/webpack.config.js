var path = require('path');

module.exports = {
  mode: 'none', // production, development, none
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // 하나의 로더 규칙을 배열 안에 넣어주면 된다.
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
}
