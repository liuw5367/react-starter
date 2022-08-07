import { PageContainer } from '@ant-design/pro-layout';
import { Button, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

import Select from '@/components/Select';
import TableComponent from '@/components/TableComponent';
import { useDispatch, useSelector } from '@/hooks';
import { ListItem, queryList } from '@/services/list';
import type { Pagination } from '@/types';

interface FormValue {
  name: string;
  code: string;
}

export default function Page() {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });
  const [dataSource, setDataSource] = useState<ListItem[]>([]);
  const loading = useSelector((s) => s.loading.effects['list/queryList']);

  const [form] = Form.useForm();

  const columns: ColumnsType<ListItem> = [
    { title: 'Name', dataIndex: 'name', render: (v) => v || '-' },
    { title: 'Age', dataIndex: 'age', render: (v) => v || '-' },
    { title: 'BirthDay', dataIndex: 'birth', render: (v) => v || '-' },
    { title: 'Email', dataIndex: 'email', render: (v) => v || '-' },
  ];

  useEffect(() => {
    requestData();
  }, []);

  async function requestData(current = pagination.current, size = pagination.pageSize) {
    const response = await dispatch({ type: 'list/queryList', payload: { current, size } });
    if (response.success) {
      const { list, current, total, size } = response.data;
      setDataSource(list);
      setPagination({ ...pagination, current, total, pageSize: size });
    }
  }

  function handleTableChange(page: any) {
    const { current, pageSize, total } = page;
    setPagination({ ...pagination, current, pageSize, total });
    requestData(current, pageSize);
  }

  function handleFinish(values: FormValue) {
    console.log('form', values);
  }

  return (
    <PageContainer
      content="欢迎使用"
      header={{
        title: '页面标题',
        // breadcrumb: {
        //   routes: [
        //     { path: '/todo', breadcrumbName: '一级页面' },
        //     { path: '', breadcrumbName: '二级页面' },
        //     { path: '', breadcrumbName: '当前页面' },
        //   ],
        // },
      }}
      // tabActiveKey={'1'}
      // onTabChange={(key) => 1}
      tabList={[
        { tab: '已选择', key: '1' },
        { tab: '可点击', key: '2' },
        { tab: '禁用', key: '3', disabled: true },
      ]}
    >
      <div className="page-content">
        <Form className="filter-form" form={form} onFinish={handleFinish} initialValues={{}}>
          <div>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Select" name="code">
              <Select />
            </Form.Item>
            <Form.Item label="Name" name="name1">
              <Input />
            </Form.Item>
            <Form.Item label="Select" name="code2">
              <Select />
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              <Button type="primary" onClick={form.submit}>
                查询
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={form.submit}>
                查询
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={form.submit}>
                查询
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={form.submit}>
                查询
              </Button>
            </Form.Item>
          </div>
        </Form>
        <TableComponent
          rowKey="id"
          columns={columns}
          loading={loading}
          dataSource={dataSource}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </PageContainer>
  );
}
