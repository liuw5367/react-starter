import type { TableProps } from 'antd'
import { Table as AntTable } from 'antd'
import type { TablePaginationConfig } from 'antd/es/table/interface'

type Props<T> = TableProps<T>

export function Table<T extends object = any>(props: Props<T>) {
  const { pagination = {}, ...otherProps } = props

  let pageConfigs: TablePaginationConfig | false = false

  if (pagination) {
    pageConfigs = {
      showTotal: (total: string | number) => {
        return `共${total}条数据`
      },
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      position: ['bottomRight'],
      ...pagination,
    }
  }

  return <AntTable<T> pagination={pageConfigs} {...otherProps} />
}
