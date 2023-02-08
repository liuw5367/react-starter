import type { Route as ProRoute } from '@ant-design/pro-layout/lib/typings';
import React from 'react';
import { Route, RouteObject, Routes } from 'react-router-dom';

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

/**
 * ProLayout 菜单配置，自动生成面包屑
 */
export const proRoutes: ProRoute = {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      // icon: <CrownOutlined />,
    },
    { path: '/todo', name: 'Todo' },
    { path: '/examples', name: 'Examples' },
    { path: '/login', name: 'Login' },
    {
      path: '/pro',
      name: 'ProLayout',
      routes: [
        { path: '/pro/1', name: 'Pro1' },
        { path: '/pro/2', name: 'Pro2' },
      ],
    },
    {
      target: '/link',
      name: 'Link1',
      routes: [{ path: 'https://github.com/liuw5367/react-template', target: 'a', name: 'Github' }],
    },
  ],
};

const NotFoundRoute: RouteItem = { path: '*', element: get(() => import('../pages/404')) };

const routes1 = (
  <Routes>
    <Route path="/" element={get(() => import('../layouts/index'))}>
      <Route index element={get(() => import('../pages/index'))} />
      <Route path="pro">
        <Route path="1" element={get(() => import('../pages/pro/pro1'))} />
        <Route path="2" element={get(() => import('../pages/pro/pro2'))} />
      </Route>
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
      { path: '/todo', element: get(() => import('../pages/todo/index')) },
      {
        path: 'pro',
        children: [
          { path: '/pro/1', element: get(() => import('../pages/pro/pro1')) },
          { path: '/pro/2', element: get(() => import('../pages/pro/pro2')) },

          NotFoundRoute,
        ],
      },
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
