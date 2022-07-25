import { PageContainer } from '@ant-design/pro-layout';

import UserPage from './../setting/user';

export default function HomePage() {
  return (
    <PageContainer
      content="欢迎使用"
      // header={{
      //   title: '页面标题',
      //   // breadcrumb: {
      //   //   routes: [
      //   //     { path: '/todo', breadcrumbName: '一级页面' },
      //   //     { path: '', breadcrumbName: '二级页面' },
      //   //     { path: '', breadcrumbName: '当前页面' },
      //   //   ],
      //   // },
      // }}
      // tabActiveKey={'1'}
      // onTabChange={(key) => 1}
      // tabList={[
      //   { tab: '已选择', key: '1' },
      //   { tab: '可点击', key: '2' },
      //   { tab: '禁用', key: '3', disabled: true },
      // ]}
    >
      <UserPage />
    </PageContainer>
  );
}
