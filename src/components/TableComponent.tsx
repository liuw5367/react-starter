import { Table } from 'antd';
import type { TablePaginationConfig } from 'antd/lib/table/interface';
import type { TableProps } from 'antd/lib/table/Table';

type Props<T> = TableProps<T>;

export default function TableComponent<T extends object = any>(props: Props<T>) {
  const { dataSource = [], pagination = {}, style = {}, ...otherProps } = props;

  let pageConfigs: TablePaginationConfig | false = false;

  if (pagination) {
    pageConfigs = {
      showTotal: (total: string | number) => {
        return `共${total}条数据`;
      },
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      position: ['bottomRight'],
      ...pagination,
    };
  }

  return (
    <Table<T> style={{ minWidth: 700, ...style }} dataSource={dataSource} pagination={pageConfigs} {...otherProps} />
  );
}
