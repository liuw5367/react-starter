import type { Route as ProRoute } from '@ant-design/pro-layout/lib/typings';
import { Route, RouteObject, Routes } from 'react-router-dom';

import Layout from '@/layouts';
import NotFound from '@/pages/404';
import Home from '@/pages/index';
import Login from '@/pages/login';
import Pro1 from '@/pages/pro/pro1';
import Pro2 from '@/pages/pro/pro2';
import SettingUser from '@/pages/setting/user';
import Todo from '@/pages/todo';

export interface RouteItem extends RouteObject {
  /** 面包屑使用 */
  title?: string;
  children?: RouteItem[];
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

export const routes1 = (
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
      <Route path="*" element={<NotFound />} />
    </Route>
    {/* <Route element={<BaseLayout />}> */}
    <Route path="login" element={<Login />} />
    {/* </Route> */}
  </Routes>
);

export const routes: RouteItem[] = [
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/todo', element: <Todo /> },
      {
        path: 'pro',
        children: [
          { path: '/pro/1', element: <Pro1 /> },
          { path: '/pro/2', element: <Pro2 /> },

          { path: '*', element: <NotFound /> },
        ],
      },
      {
        path: 'setting',
        title: 'setting',
        children: [
          { path: '/setting/user', title: 'user', element: <SettingUser /> },

          { path: '*', element: <NotFound /> },
        ],
      },

      { path: '*', element: <NotFound /> },
    ],
  },
];
