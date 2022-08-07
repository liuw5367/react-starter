import { Breadcrumb, Layout } from 'antd';
import type React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { breadcrumbConfig } from '@/config/breadcrumb';

interface Props {
  children: React.ReactNode;
}

export default function Content(props: Props) {
  const { children } = props;

  const { pathname } = useLocation();
  const breadcrumb = breadcrumbConfig[pathname] || { label: '', value: [] };
  const breadcrumbVisible = breadcrumb.value && breadcrumb.value.length > 1;

  return (
    <Layout className="px-6 py-0 h-full overflow-auto">
      {breadcrumbVisible && (
        <Breadcrumb className="my-4">
          {breadcrumb.value?.map((v) => {
            const [text, link] = v;
            return <Breadcrumb.Item key={text}>{link ? <Link to={link}>{text}</Link> : <>{text}</>}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
      )}
      <Layout.Content className="bg-white p-6 m-0 min-h-auto" style={{ marginTop: breadcrumbVisible ? 0 : 24 }}>
        {children}
      </Layout.Content>
      {/* <Layout.Footer className="text-center py-4 text-xs">Footer</Layout.Footer> */}
    </Layout>
  );
}
