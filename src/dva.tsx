// @ts-ignore create
import { create } from 'dva-core';
// @ts-ignore createLoading
import createLoading from 'dva-loading';
import { History } from 'history';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';

import { history } from './App';
import { models } from './models';
import { Model } from './types/redux.js';

// https://github.com/dvajs/dva/blob/master/packages/dva/index.d.ts
interface DvaInstance {
  _store: any;
  _history: History;
  /**
   * Register an object of hooks on the application.
   *
   * @param hooks
   */
  use: (hooks: unknown) => void;

  /**
   * Register a model.
   *
   * @param model
   */
  model: (model: Model) => void;

  /**
   * Unregister a model.
   *
   * @param namespace
   */
  unmodel: (namespace: string) => void;

  /**
   * Start the application. Selector is optional. If no selector
   * arguments, it will return a function that return JSX elements.
   *
   * @param selector
   */
  start: (selector?: HTMLElement | string) => any;
}

let dvaApp: DvaInstance | undefined;

function getDvaApp() {
  return dvaApp;
}

export function DvaRoot(props: { children?: React.ReactNode }) {
  const app = useRef<DvaInstance>();
  if (!app.current) {
    app.current = create(
      { history },
      {
        initialReducer: {},
        setupMiddlewares(middlewareList: Function[]) {
          return [...middlewareList];
        },
        setupApp(app: DvaInstance) {
          app._history = history;
        },
      },
    );
    dvaApp = app.current;

    app.current?.use(createLoading());
    Object.values(models).forEach((item: Model) => {
      app.current?.model(item);
    });
    app.current?.start();
  }
  return <Provider store={app.current!._store}>{props.children}</Provider>;
}
