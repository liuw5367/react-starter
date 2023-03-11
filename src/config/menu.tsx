import type { MenuItem } from '@/types';

export const menuConfig: MenuItem[] = [
  { title: 'Home', link: '/', key: '/' },
  { title: 'Examples', link: '/examples', key: '/examples' },
  { title: 'List', link: '/list', key: 'list' },
  { title: 'Login', link: '/login', key: 'login' },
  {
    title: 'Setting',
    link: '/setting',
    key: 'setting',
    children: [{ title: 'User', link: '/setting/user', key: '/setting/user' }],
  },
  {
    title: 'About',
    link: '/about',
    key: 'about',
    children: [
      {
        title: 'Github',
        link: 'https://github.com/liuw5367/react-template',
        key: 'Github',
      },
    ],
  },
];
