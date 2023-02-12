# react-template

![React](https://img.shields.io/static/v1?label=React&message=v18&color=blue) ![TypeScript](https://img.shields.io/static/v1?label=TypeScript&message=v4&color=blue) ![Vite](https://img.shields.io/static/v1?label=Vite&message=v4&color=blue) ![Antd](https://img.shields.io/static/v1?label=Antd&message=v5&color=blue)

React 后台管理项目模板。

使用 Vite 4, pnpm

[Umi4 分支](https://github.com/liuw5367/react-template/tree/umi)

## dependencies

- React 18
- React Router Dom 6
- Ant Design 5
- unocss
- jotai

### config

- CommitLint
- [EsLint](.eslintrc.js)
- [StyleLint](.stylelintrc.js)
- [Prettier](.prettierrc.js)

### Dva TypeScript Types

状态管理库有很多很多...

Dva 是 umi 体系里的，之前用 umi 的时候用的。

Dva 使用 react-route-dom v5 版本。

Umi 升级 4.0 使用了 react-route-dom v6，用的包是 dva-core, 用来规避 dva 的版本问题。

Dva 基于 redux、saga，但是因为 saga 使用 generator 导致 ts 推断不好，这里重新定义了类型：

1. 支持 dispatch 的 type 和 payload 参数校验
2. 支持 dispatch 返回值类型
3. put 支持省略 namespace
4. 添加 generator 函数用于 yield\* 自动推断函数返回值类型
5. effect 和 reducer 函数可获得 dispatch 的 action 类型

下面是重新定义的 TS 类型：

- [Dispatch](https://github.com/liuw5367/examples/tree/main/frontend/dva-ts-vite/src/hooks/useDispatch.ts)
- [Selector](https://github.com/liuw5367/examples/tree/main/frontend/dva-ts-vite/src/hooks/useSelector.ts)
- [ModelType](https://github.com/liuw5367/examples/tree/main/frontend/dva-ts-vite/src/dva/redux.ts)
