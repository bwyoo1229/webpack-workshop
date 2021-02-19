var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        // 로더의 순서도 영향이 있다.
        // 로더는 오른쪽에서 왼쪽 순서로 해석 된다.
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin() // 플러그인은 객체를 생성해서 배열안에 넣어주면 된다.
  ]
}
