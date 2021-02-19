# Learning Webpack

## NPM

### Start NPM
```
npm init
npm init -y
```

### Install
```
// install all packages in package.json
npm install
npm i

npm install [package]
npm i [package]
```

npm init시 package.json 생성된다.

### Uninstall
```
npm uninstall [package]
```

### Install Globally
```
npm install [package] --global
npm i [package] -g
```

### Install Locally
**Dependency**
```
npm install [package] --save-prod
npm i [package]
```

**Dev Dependency**
```
npm install [package] --save-dev
npm i [package] -D
```

- npm install 시 node_modules 안에 package가 설치된다.
- node_modules는 github에 공유될 필요가 없으므로 .gitignore에 포함시켜야된다.
- npm install로 설치되는 패키지들이 생성되는 시점의 의존성 트리에 대한 정확한 정보는 package-lock.json에 기록된다.
- package-lock.json은 자동생성되며 **직접** 수정하지 말아야 한다.

> package-lock.json에 패키지 버전이 따로 기록되는 이유
>  - package.json은 version range로 의존성이 선언된다. 따라서 업데이트 시 version range 안에 있는 패키지가 설치되게 된다.
>  - (version range를 사용하는 이유는 특정 구간의 버전을 사용하게 하여 작은 업데이트나 버그 수정 후 버전을 사용할 수 있게 하기 위해서 이다.)
>  - 하지만 간혹 version range안의 버전에 오류가 있을 경우 package-lock.json 파일의 정확한 의존성 정보를 통해 정확한 버전을 이용할 수 있다.

### Deps vs Dev Deps
**Deps:** 어플리케이션 로직과 직접적인 연관이 있음. (뷰에 직접적인 연관)
ex) react, vue, angular, chart

**Dev Deps:** 개발에 보조적으로 필요한 패키지
ex) babel, webpack, sass

## Webpack

### Install Webpack
```
npm i webpack webpack-cli -D
```
- webpack-cli 는 터미널에서 웹팩 명령어 조작을 쉽게 도와주는 라이브러리이다.

### Webpack의 등장배경
1. 파일 단위의 자바스크립트 모듈 관리의 중요성
2. 웹 개발 작업 자동화 도구 (Web Task manager)
3. 웹 어플리케이션의 빠른 로딩 속도와 높은 성능

### Webpack이 해결하려는 문제
1. 자바스크립트 변수 유효 범위 문제
   - ES6 모듈 문법과 웹팩의 모듈 번들링으로 해결
2. 브라우저별 HTTP 요청 숫자의 제약
   - TCP 스펙에 따라 브라우저에서 보낼 수 있는 HTTP 요청의 숫자는 정해져 있다.
  
  | 브라우저 | HTTP 요청 가능 숫자 |
  | :---: | :---: |
  | 익스플로러 10, 11 | 8, 13 |
  | 크롬 | 6 |
  | 사파리 | 6 |
  | 파이어폭스 | 6 |
  | android / ios | 6 |

3. Dynamic loading, Lazy loading 미지원
   - 웹팩의 코드 스플리팅으로 해결

### Webpack Build
```
// package.json

{
  .
  .
  .
  "scripts": {
    "build": "webpack"
  }
}
```

### Webpack Config
```
//webpack.config.js

module.exports = {
  mode='none',
  entry='./src/index.js'
  output='./dist/output.js',
  .
  .
  .
}
```
- CommonJS 모듈 문법 활용
  
### Webpack Source-map
- webpack의 빌드 모드를 프로덕션 모드로 빌드를 하게 되면 코드가 난독화된다. (난독화 되지 않더라도 모든 모듈화한 코드가 합쳐지게 된다)
- 이때 브라우저의 개발자 도구에서 빌드 후 코드를 보여주게 되면 디버깅 생산성이 매우 낮아질 것이다.
- 이를 해결하기 위해 webpack에는 source-map이라는 기능이 있다.

**Source map 이란?**
- 개발자 도구에서 빌드된 코드와 빌드 되기 전 코드를 연결해주는 기능
- 소스 맵을 이용해 빌드 파일의 특정 부분이 원본의 어느 소스인지 확인해 줄 수 있게 해준다.

**사용법**
```
// webpack.config.js

module.exports = {
  devtool: 'source-map'
}
```

### 웹팩의 주요 4가지 속성
1. entry
2. output
3. loader
4. plugin

#### Entry
`entry` 속성은 웹팩에서 웹 자원을 변환하기 위한 최초 진입점이다.
```
// webpack.config.js

module.exports = {
  entry: './src/index.js'
}
```
- Entry 포인트는 1개가 될 수도 있지만 여러개가 될 수도 있다.

#### Output
웹팩 파일을 돌리고 난 결과물의 경로이다.
```
// webpack.config.js
var path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist)
  }
}
```
filename에 `name`, `id`, `hash`, `chunkhash`들의 옵션을 줄 수 있다.

#### Loader
웹팩이 자바스크립트가 아닌 그외의 웹 자원들을 변환할 수 있게 하는 속성이다.
```
// webpack.config.js

module.exports = {
  module: {
    rules: []
  }
}
```
로더는 기본적으로 오른쪽에서 왼쪽 순으로 적용된다.

```
// loader의 순서 적용 예시

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
```

#### plugin
웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성
주로 플러그인은 해당 결과물의 형태를 바꾸는 역할을 한다.
```
// webpack.config.js

module.exports = {
  plugins: []
}
```
플러그인의 배열에는 생성자 함수로 생성한 객체 인스턴스만 추가될 수 있다.