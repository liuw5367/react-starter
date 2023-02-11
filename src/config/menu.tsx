import type { MenuItem } from '@/types';

export const menuConfig: MenuItem[] = [
  { title: 'Home', link: '/', key: '/', icon: 'HomeOutlined' },
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
];
