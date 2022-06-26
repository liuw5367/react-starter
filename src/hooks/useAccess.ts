/**
 * 权限管理
 */
export function useAccess() {
  // const permissions = useSelector(s => s.global.permissions);
  const permissions: string[] = [];

  return {
    permissions,
    hasPermission: function (permission?: string): boolean {
      if (!permission) return true;
      return permissions?.includes(permission) ?? false;
    },
  };
}
