import { message, Select, SelectProps } from 'antd';
import { CSSProperties, FC, memo } from 'react';

import type { LabelValueItem } from '@/types';

interface Props extends SelectProps {
  value?: any;

  hasAll?: boolean;
  allLabel?: string;
  allValue?: any;

  options?: any[] | LabelValueItem[];
  labelKey?: string;
  valueKey?: string;
  onChange?: (value: any) => void;

  showSearch?: boolean;
  style?: CSSProperties;
  fixed?: boolean;
  dropdownMatchSelectWidth?: boolean;
  virtual?: boolean;

  isMulti?: boolean;
  maxSelect?: number;
}

/**
 * 默认不限制最大宽度，不限制选项同宽
 */
const SelectView: FC<Props> = (props) => {
  const {
    value = '',
    hasAll = false,
    allLabel = '全部',
    allValue = '',

    placeholder = '请选择',
    options = [],
    onChange,

    labelKey = 'label',
    valueKey = 'value',

    showSearch = true,
    style = {},
    fixed = true,
    size = 'middle',
    dropdownMatchSelectWidth = false,
    virtual = true,
    allowClear = false,

    isMulti = false,
    maxSelect = -1,
    ...otherProps
  } = props;

  if (isMulti) {
    otherProps.mode = 'multiple';
  }

  const handleChange = (e: any) => {
    if (isMulti && maxSelect > 0 && e.length > maxSelect) {
      message.warn(`最多可选择${maxSelect}个`);
      return;
    }
    onChange?.(e);
  };

  if (fixed) {
    // 由于 Modal 的用法不存在 triggerNode，这样会导致 triggerNode is undefined 的报错，需要增加一个判断条件。
    // https://ant.design/components/config-provider-cn/#API
    otherProps.getPopupContainer = (node: any) => (node ? node.parentNode : document.body);
  }

  function handleFilterOption(inputValue: string, option: any) {
    return (
      option.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
      (typeof option.value === 'string' && option.value.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0)
    );
  }

  return (
    <Select
      value={value}
      placeholder={placeholder}
      showSearch={showSearch}
      style={{ minWidth: 120, ...style }}
      onChange={handleChange}
      filterOption={handleFilterOption}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      virtual={virtual}
      optionFilterProp="children"
      showArrow={true}
      size={size}
      allowClear={allowClear}
      {...otherProps}
    >
      {hasAll && <Select.Option value={allValue}>{allLabel}</Select.Option>}
      {options?.map((item) => (
        <Select.Option key={item[valueKey]} title={item[labelKey]} value={item[valueKey]} disabled={item.disabled}>
          {item[labelKey] || item[valueKey]}
        </Select.Option>
      ))}
    </Select>
  );
};

export default memo(SelectView);
