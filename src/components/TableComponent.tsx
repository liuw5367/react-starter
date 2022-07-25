import { Table } from 'antd';
import type { TablePaginationConfig } from 'antd/lib/table/interface';
import type { TableProps } from 'antd/lib/table/Table';
import { FC, useState } from 'react';

interface Props extends TableProps<any> {
  scrollToTop?: boolean;
  scrollElement?: HTMLElement;
}

const TableComponent: FC<Props> = (props) => {
  const {
    dataSource = [],
    onChange,
    loading = false,
    pagination = {},

    bordered = false,
    size = 'small',
    style = {},

    scrollToTop = false,
    scrollElement,

    ...otherProps
  } = props;

  const [pageIndex, setPageIndex] = useState(1);

  let pageConfigs: TablePaginationConfig | false = false;

  if (pagination) {
    pageConfigs = {
      showTotal: (total: string | number) => {
        // const pSize = Math.ceil(total / pagination.pageSize - 0);
        return `共${total}条数据`;
      },
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      // @ts-ignore
      size: 'middle',
      position: ['bottomRight'],
      ...pagination,
    };
  }

  function handleChange(page: any, filters: any, sorter: any, extra: any) {
    onChange?.(page, filters, sorter, extra);
    const tempPage = pageIndex;
    const currentIndex = page.current;
    setPageIndex(currentIndex);

    if (tempPage !== currentIndex && scrollToTop) {
      const element = scrollElement || document.getElementById('app-page-container') || window;
      element.scrollTo({ left: 0, top: 0, behavior: 'auto' });
    }
  }

  return (
    <Table
      style={{ minWidth: 700, ...style }}
      loading={loading}
      dataSource={dataSource}
      pagination={pageConfigs}
      onChange={handleChange}
      bordered={bordered}
      size={size}
      {...otherProps}
    />
  );
};
export default TableComponent;
