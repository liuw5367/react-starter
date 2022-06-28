import { Layout } from 'antd';
import { Outlet, useLocation } from 'umi';

import Content from './Content';
import Header from './Header';
import ProLayout from './ProLayout';
import SiderBar from './Sidebar';

export default function Index() {
  let { pathname } = useLocation();
  if (pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }

  if (pathname === '/login') {
    return <Outlet />;
  }

  if (pathname.startsWith('/')) {
    return (
      <ProLayout>
        <Outlet />
      </ProLayout>
    );
  }

  return (
    <Layout>
      <Header />
      <Layout style={{ height: 'calc(100vh - var(--headerHeight))' }}>
        <SiderBar />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
