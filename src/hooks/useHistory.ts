import { history } from 'umi';

/**
 * 考虑使用 useNavigate()
 */
export function useHistory() {
  return history;
}
