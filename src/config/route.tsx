import type { Route as ProRoute } from '@ant-design/pro-layout/lib/typings';
import { Route, Routes } from 'react-router-dom';

import Layout from '@/layouts';
import NotFound404 from '@/pages/404';
import Home from '@/pages/index';
import Login from '@/pages/login';
import Pro1 from '@/pages/pro/pro1';
import Pro2 from '@/pages/pro/pro2';

export interface RouteItem {
  /** 面包屑使用 */
  title?: string;
  /** 路由地址 */
  path: string;
  component?: string;
  exact?: boolean;
  routes?: RouteItem[];
  microApp?: string;
}

const NotFoundRoute: RouteItem = { path: '*', title: '404', component: '@/pages/404' };

/**
 * umi4 里所有路由默认都走 @/layout ?
 */
export const umiRoutes: RouteItem[] = [
  { exact: true, path: '/', title: 'Home', component: '@/pages/index' },
  { exact: true, path: '/login', component: '@/pages/login' },
  { exact: true, path: '/todo', title: 'Todo', component: '@/pages/todo' },
  {
    path: '/setting',
    title: 'Setting',
    routes: [
      //
      { exact: true, path: '/setting/user', title: 'Users', component: '@/pages/setting/user' },

      NotFoundRoute,
    ],
  },
  { exact: true, path: '/pro/1', title: 'Pro1', component: '@/pages/pro/pro1' },
  { exact: true, path: '/pro/2', title: 'Pro2', component: '@/pages/pro/pro2' },

  NotFoundRoute,
];

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

export const routes = (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="pro">
        <Route path="1" element={<Pro1 />} />
        <Route path="2" element={<Pro2 />} />
      </Route>
      {/* <Route path="list" element={<List />} />
      <Route path="setting">
        <Route path="role" element={<SettingRole />} />
        <Route path="user" element={<SettingUser />} />
        <Route path="*" element={<NotFound404 />} />
      </Route> */}
      <Route path="*" element={<NotFound404 />} />
    </Route>
    {/* <Route element={<BaseLayout />}> */}
    <Route path="login" element={<Login />} />
    {/* </Route> */}
  </Routes>
);
