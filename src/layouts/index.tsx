import { Layout, message } from 'antd';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useQuery } from '@/hooks';
import { isLogin } from '@/utils';

import Content from './Content';
import Header from './Header';
import ProLayout from './ProLayout';
import SiderBar from './Sidebar';

export default function Index() {
  const location = useLocation();
  const [query] = useQuery();
  let { pathname } = location;
  if (pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }

  if (pathname === '/login') {
    if (isLogin()) {
      message.success('已登陆');
      return <Navigate to={query.redirect || ''} />;
    } else {
      return <Outlet />;
    }
  }

  if (!isLogin()) {
    return <Navigate to={`/login?redirect=${location.pathname}${location.search ? `/${location.search}` : ''}`} />;
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
