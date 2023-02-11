import { Layout, message } from 'antd';
import { useAtomValue } from 'jotai';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { mobileAtom } from '@/atom';
import { useQuery } from '@/hooks';
import { isLogin } from '@/utils';

import Content from './Content';
import Header from './Header';
import SiderBar from './Sidebar';

export default function Index() {
  const isMobile = useAtomValue(mobileAtom);
  const location = useLocation();
  const { query } = useQuery();
  let { pathname } = location;
  if (pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }

  const children = <Outlet />;

  if (pathname === '/login') {
    if (isLogin()) {
      message.success('已登陆');
      return <Navigate to={query.redirect || ''} />;
    }
    else {
      return children;
    }
  }

  if (!isLogin()) {
    return <Navigate to={`/login?redirect=${location.pathname}${location.search ? `/${location.search}` : ''}`} />;
  }

  return (
    <Layout style={{ flexDirection: 'column' }}>
      <Header />
      <Layout style={{ width: '100%', height: 'calc(100vh - var(--headerHeight))' }}>
        {!isMobile && <SiderBar />}
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
