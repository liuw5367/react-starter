import { Breadcrumb, Layout } from 'antd';
import { isEmpty } from 'lodash';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { generateBreadcrumbPathMap } from '@/config/breadcrumb';
import type { LabelValueItem } from '@/types';

interface Props {
  children: React.ReactNode;
}

let breadcrumbConfig: Record<string, LabelValueItem<string[]>> = {};

export default function Content(props: Props) {
  const { children } = props;
  const { pathname } = useLocation();

  if (isEmpty(breadcrumbConfig)) {
    breadcrumbConfig = generateBreadcrumbPathMap();
  }

  const breadcrumb = breadcrumbConfig[pathname] || { label: '', value: [] };
  const breadcrumbVisible = breadcrumb.value && breadcrumb.value.length > 1;

  return (
    <Layout className="px-6 py-0 h-full overflow-auto">
      {breadcrumbVisible && (
        <Breadcrumb style={{ marginTop: 12, marginBottom: 12 }}>
          {breadcrumb.value?.map((v) => {
            const [text, link] = v;
            return <Breadcrumb.Item key={text}>{link ? <Link to={link}>{text}</Link> : <>{text}</>}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
      )}
      <Layout.Content className="bg-white m-0" style={{ marginTop: breadcrumbVisible ? 0 : 24 }}>
        {children}
      </Layout.Content>
      {/* <Layout.Footer className="text-center py-4 text-xs">Footer</Layout.Footer> */}
    </Layout>
  );
}
