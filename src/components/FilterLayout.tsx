import type React from 'react';
import type { CSSProperties } from 'react';

import styles from './FilterLayout.module.less';

interface Props {
  style?: CSSProperties;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function FilterLayout(props: Props) {
  const { style = {} } = props;
  return (
    <div className={styles.layout} style={{ ...style }}>
      <div>{props.children}</div>
      <div>{props.actions}</div>
    </div>
  );
}

interface FilterProps {
  label?: string;
  style?: CSSProperties;
  labelStyle?: CSSProperties;

  children: React.ReactNode | React.ReactNode[];
}

export function Filter(props: FilterProps) {
  const { label, style = {}, labelStyle = {} } = props;

  return (
    <div className="flex flex-row items-center" style={style}>
      {label && (
        <span className="mr-2" style={labelStyle}>
          {label}
        </span>
      )}
      {props.children}
    </div>
  );
}
