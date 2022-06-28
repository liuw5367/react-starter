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

  NotFoundRoute,
];
