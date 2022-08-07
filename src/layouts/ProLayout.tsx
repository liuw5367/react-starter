import { CrownOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-layout';
import type { Route } from '@ant-design/pro-layout/lib/typings';
import { Avatar } from 'antd';
import type React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { proRoutes } from '@/config';
import { APP_NAME } from '@/constants';

import HeaderRight from './HeaderRight';

interface Props {
  children: React.ReactNode;
}

export default function Index(props: Props) {
  const navigate = useNavigate();
  const { children } = props;

  let { pathname } = useLocation();
  if (pathname.endsWith('/')) {
    pathname = pathname.substring(0, pathname.length - 1);
  }

  function renderMenuItem(item: Route, dom: React.ReactNode) {
    return <a onClick={() => navigate(item.path || '/')}>{dom}</a>;
  }

  return (
    <ProLayout
      navTheme="light"
      headerTheme="light"
      layout="mix"
      fixSiderbar={true}
      fixedHeader={true}
      // 将菜单分割成两部分，顶部和侧边栏
      splitMenus={false}
      location={{ pathname }}
      route={proRoutes}
      menuItemRender={renderMenuItem}
      logo={<Avatar shape="circle" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} icon={<CrownOutlined />} />}
      headerTitleRender={() => (
        <div>
          <CrownOutlined className="mr-2" />
          {APP_NAME}
        </div>
      )}
      rightContentRender={() => <HeaderRight />}
      // onMenuHeaderClick={(e) => console.log(e)}
      // headerContentRender={() => <div>headerContentRender()</div>}
    >
      {children}
    </ProLayout>
  );
}
