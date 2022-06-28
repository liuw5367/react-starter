import { Layout, Menu } from 'antd';
import { useLocation } from 'umi';

import { menuItems } from './Sidebar';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <Layout.Header className="flex flex-row items-center px-6" style={{ height: 'var(--headerHeight)' }}>
      <div className="w-152px h-32px mr-24px flex items-center justify-center text-white bg-white/30">
        React Template
      </div>
      <Menu className="flex-1" theme="dark" mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
    </Layout.Header>
  );
}
