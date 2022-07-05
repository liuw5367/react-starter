import type { Route } from '@ant-design/pro-layout/lib/typings';

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
export const routes: RouteItem[] = [
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
export const proRoutes: Route = {
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
      routes: [
        { path: 'https://umijs.org', target: 'a', name: 'Umi' },
        { path: 'https://github.com/liuw5367/react-template', target: 'a', name: 'Github' },
      ],
    },
    {
      target: '/link',
      name: 'Link2',
      flatMenu: true,
      routes: [
        { path: 'https://umijs.org', target: 'a', name: 'Umi' },
        { path: 'https://github.com/liuw5367/react-template', target: 'a', name: 'Github' },
      ],
    },
  ],
};
