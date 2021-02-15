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