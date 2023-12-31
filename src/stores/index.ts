import { cloneDeep } from 'lodash'
import { create } from 'zustand'

import { menuConfig } from '@/config/menu'
import type { MenuItem } from '@/types'

interface GlobalState {
  isMobile: boolean
  menus: MenuItem[]
  menuExpand: boolean
}

interface GlobalAction {
  setMenuExpand: (expand: boolean) => void
}

export const useGlobalStore = create<GlobalState & GlobalAction>(set => ({
  isMobile: false,
  menuExpand: true,
  menus: cloneDeep(menuConfig),
  setMenuExpand(menuExpand: boolean) {
    set({ menuExpand })
  },
}))

/*
function example() {
  1. hooks 获取变量和函数，使用函数更新数据
  const value = useStore(state => state.value);
  const updateValue = useStore(state => state.updateValue);
  // 使用函数更新数据
  updateValue(value)

  2. 使用 setState 直接更新数据
  useGlobalStore.setState({ bears: 1 });
  useGlobalStore.setState((state) => ({ bears: state.bears + 1 }));

  3. 使用 getState 直接获取数据
  const state = useGlobalStore.getState();
  console.log(state.bears);
}
*/

/**
 *  localStorage 示例
 */
/*
interface CacheState {
  cacheData: boolean
}
const useCacheStore = create<CacheState, [['zustand/persist', CacheState]]>(
  persist(
    (set, get) => ({
      cacheData: false,
    }),
    {
      name: 'cacheName',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
*/
