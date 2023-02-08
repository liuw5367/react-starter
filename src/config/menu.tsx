import type { MenuItem } from '@/types';

export const menuConfig: MenuItem[] = [
  { title: 'Home', link: '/', key: '/', icon: 'HomeOutlined' },
  { title: 'Todo', link: '/todo', key: '/todo', icon: 'OrderedListOutlined' },
  { title: 'Examples', link: '/examples', key: '/examples', icon: 'OrderedListOutlined' },
  {
    title: 'Setting',
    link: '/setting',
    key: 'setting',
    icon: 'SettingOutlined',
    children: [{ title: 'User', link: '/setting/user', key: '/setting/user' }],
  },
  {
    title: 'About',
    link: '/about',
    key: 'about',
    icon: 'NotificationOutlined',
    children: [
      {
        title: 'Github',
        link: 'https://github.com/liuw5367/react-template',
        key: 'Github',
        icon: 'LinkOutlined',
      },
    ],
  },
  {
    title: 'ProLayout',
    link: '/pro',
    key: 'ProLayout',
    icon: 'NotificationOutlined',
    children: [
      { title: 'Pro1', link: '/pro/1', key: '/pro/1' },
      { title: 'Pro2', link: '/pro/2', key: '/pro/2' },
    ],
  },
];
