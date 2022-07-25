import { Button, Input } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

import FilterLayout, { Filter } from '@/components/FilterLayout';
import Select from '@/components/Select';
import TableComponent from '@/components/TableComponent';
import { ListItem, queryList } from '@/services/list';
import type { Pagination } from '@/types';

export default function Page() {
  const [pagination, setPagination] = useState<Pagination>({ current: 1, pageSize: 10, total: 0 });
  const [dataSource, setDataSource] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    const response = await queryList({ current, size });
    if (response.success) {
      const { list, current, total, size } = response.data;
      setDataSource(list);
      setPagination({ ...pagination, current, total, pageSize: size });
      setLoading(false);
    }
  }

  function handleTableChange(page: any) {
    const { current, pageSize, total } = page;
    setPagination({ ...pagination, current, pageSize, total });
    requestData(current, pageSize);
  }

  return (
    <div className="page-content">
      <FilterLayout
        actions={
          <>
            <Button>Submit</Button>
            <Button type="primary">Add</Button>
            <Button>Submit</Button>
            <Button type="primary">Add</Button>
          </>
        }
      >
        <Filter label="Name:">
          <Input className="w-60" />
        </Filter>
        <Filter label="Name:">
          <Select />
        </Filter>
        <Filter label="Name:">
          <Input className="w-60" />
        </Filter>
        <Filter label="Name:">
          <Select />
        </Filter>
      </FilterLayout>
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
