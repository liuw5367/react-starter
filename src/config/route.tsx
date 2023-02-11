import React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

export type RouteItem = RouteObject & {
  /** 面包屑使用 */
  name?: string;
  children?: RouteItem[];
};

/**
 * 将路径转化为组件
 */
function get(fn: () => Promise<any>) {
  const Component = React.lazy(fn);
  return (
    <React.Suspense fallback={null}>
      <Component />
    </React.Suspense>
  );
}

const NotFoundRoute: RouteItem = { path: '*', element: get(() => import('../pages/404')) };

const routes1 = (
  <Routes>
    <Route path="/" element={get(() => import('../layouts/index'))}>
      <Route index element={get(() => import('../pages/index'))} />
      <Route path="*" element={get(() => import('../pages/404'))} />
    </Route>
    <Route path="login" element={get(() => import('../pages/login/index'))} />
  </Routes>
);

export const routes: RouteItem[] = [
  { path: '/login', element: get(() => import('../pages/login/index')) },
  {
    path: '/',
    element: get(() => import('../layouts/index')),
    children: [
      { index: true, element: get(() => import('../pages/index')) },
      { path: '/examples', element: get(() => import('../pages/examples')) },
      {
        path: 'setting',
        name: 'setting',
        children: [
          { path: '/setting/user', name: 'user', element: get(() => import('../pages/setting/user')) } as RouteItem,

          NotFoundRoute,
        ],
      },

      NotFoundRoute,
    ],
  },
];
