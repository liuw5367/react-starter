# react-template

![React](https://img.shields.io/static/v1?label=React&message=v18&color=blue) ![TypeScript](https://img.shields.io/static/v1?label=TypeScript&message=v4&color=blue) ![Vite](https://img.shields.io/static/v1?label=Vite&message=v3&color=blue) ![Antd](https://img.shields.io/static/v1?label=Antd&message=v4&color=blue)

React 后台管理项目模板。

使用 Vite 3

## dependencies

- React 18
- React Router Dom 6
- Umi 4
- Ant Design 4
- Dvajs
- unocss

### config

- CommitLint
- [EsLint](.eslintrc.js)
- [StyleLint](.stylelintrc.js)
- [Prettier](.prettierrc.js)

### Dva TypeScript Types

状态管理库有很多很多...

Dva 是 umi 体系里的，用起来也还行吧。 Dva 这个库用的是 react-route-dom v5 版本。Umi 升级 4.0 使用了 react-route-dom v6，用的包是 dva-core, 用来规避 dva 的版本问题。

Dva 基于 redux、saga，但是因为 saga 使用 generator 导致 ts 推断不好，这里重新定义了类型，支持了 dispatch 的 type 和 payload 参数校验，也加上了返回值类型。model 中的 put 和 dispatch 一样，不过额外支持了省略 namespace。添加了一个 generator 函数用于 yield\* 自动推断函数返回值类型。

下面是重新定义的 TS 类型：

- [Dispatch](./src/hooks/useDispatch.ts)
- [Selector](./src/hooks/useSelector.ts)
- [ModelType](./src/types/redux.ts)
