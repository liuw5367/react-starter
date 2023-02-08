import React from 'react';

import { useAccess } from '@/hooks';

interface Props {
  /** 是否具有权限 */
  accessible?: boolean;
  /** 权限的值 */
  permission?: string;
  /** 无权限时显示 */
  fallback?: React.ReactNode;
  /** 子元素 */
  children?: any;
}

/** 判断用户权限 */
function Permission(props: Props) {
  const { permission, fallback = null, children = null } = props;
  const access = useAccess();

  if (permission && access.hasPermission(permission)) return children;

  return fallback;
}

/**
 * 传 accessible 或者 传具体权限 permission 的值
 */
export default function Access(props: Props) {
  const { accessible, permission, fallback = null, children = null } = props;

  /* 根据传入的值 直接控制是否显示 */
  if (accessible === true) return children;
  if (accessible === false) return fallback;

  /** 判断用户权限  */
  if (permission) return <Permission {...props} />;

  /* 无权限限制 */
  if (!accessible && !permission) return children;

  return fallback;
}
