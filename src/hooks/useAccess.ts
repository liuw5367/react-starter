/**
 * 权限管理
 */
export function useAccess() {
  const permissions: string[] = []; // useSelector((s) => s.global.permissions);

  function hasPermission(permission?: string): boolean {
    if (!permission) return true;
    return permissions?.includes(permission) ?? false;
  }

  return {
    permissions,
    hasPermission,
  };
}
