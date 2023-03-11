import { Button, Form, Input, Select } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

import TableComponent from '@/components/TableComponent';
import type { ListItem } from '@/services/list';
import { queryList } from '@/services/list';
import type { Pagination } from '@/types';

export default function Page() {
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });
  const [dataSource, setDataSource] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: ColumnsType<ListItem> = [
    { title: 'Name', dataIndex: 'name', render: (v) => v || '-' },
    { title: 'Age', dataIndex: 'age', render: (v) => v ?? '-' },
    { title: 'BirthDay', dataIndex: 'birth', render: (v) => v || '-' },
    { title: 'Email', dataIndex: 'email', render: (v) => v || '-' },
  ];

  useEffect(() => {
    requestData();
  }, []);

  async function requestData(current = pagination.current, size = pagination.pageSize) {
    setLoading(true);
    const response = await queryList({ current, size });
    if (response.success) {
      const { list, current, total, size } = response.data;
      setDataSource(list);
      setPagination({ ...pagination, current, total, pageSize: size });
    }
    setLoading(false);
  }

  function handleTableChange(page: any) {
    const { current, pageSize, total } = page;
    setPagination({ ...pagination, current, pageSize, total });
    requestData(current, pageSize);
  }

  return (
    <div className="p-6 overflow-auto bg-white">
      <Form className="filter-form">
        <div>
          <Form.Item label="Name">
            <Input className="w-60" />
          </Form.Item>
          <Form.Item label="Name">
            <Select style={{ width: 180 }} />
          </Form.Item>
          <Form.Item label="Name">
            <Input className="w-60" />
          </Form.Item>
          <Form.Item label="Name">
            <Select style={{ width: 180 }} />
          </Form.Item>
        </div>
        <div>
          <Button>Submit</Button>
          <Button type="primary">Add</Button>
          <Button>Submit</Button>
          <Button type="primary">Add</Button>
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
  );
}
