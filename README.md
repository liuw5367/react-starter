# react-template

![React](https://img.shields.io/static/v1?label=React&message=v18&color=blue) ![TypeScript](https://img.shields.io/static/v1?label=TypeScript&message=v4&color=blue) ![Umi](https://img.shields.io/static/v1?label=Umi&message=v4&color=blue) ![Antd](https://img.shields.io/static/v1?label=Antd&message=v4&color=blue)

React 后台管理项目模板。

使用 Umi 主要是路由自动注册，Dva Model 自动注册，微前端 qiankun。

Umi 4.0 版本的 MSFU 感觉不太好使。后续看看换成 Vite，然后加上微前端，SSR 暂时没啥需求。Umi4 自带的 Vite 配置启动后报错，之后也不敢用了... 其实 Umi 也不是必要的，用到的东西都自己配一下就是了。如果是多项目考虑到微前端集成方便，倒还有一点意义。反而是因为用了 Umi 感觉多了一些限制，不自由了，挂载 root 也不能自己控制。

## dependencies

- React
- React Router Dom
- Umi
- Dvajs
- Ant Design

### config

- CommitLint
- [EsLint](.eslintrc.js)
- [StyleLint](.stylelintrc.js)
- [Prettier](.prettierrc.js)

### Dva TypeScript Types

状态管理库有很多很多...

Dva 是 umi 体系里的，用起来也还行吧。 Dva 这个库是 react-route-dom v5 版本的。Umi 升级 4.0 使用了 react-route-dom v6，使用的是 dva-core, 用来规避版本问题。

Dva 基于 redux、saga，但是因为 saga 使用 generator 导致 ts 推断不好，这里重新定义了类型，支持了 dispatch 的 type 和 payload 参数校验，也加上了返回值类型。model 中的 put 和 dispatch 一样，不过额外支持了省略 namespace。添加了一个 generator 函数用于 yield\* 自动推断函数返回值类型。

- [Dispatch](./src/hooks/useDispatch.ts)
- [Selector](./src/hooks/useSelector.ts)
- [ModelType](./src/types/redux.ts)
