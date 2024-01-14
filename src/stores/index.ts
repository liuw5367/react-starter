import { cloneDeep } from 'lodash'
import { create } from 'zustand'

import { menuConfig } from '@/config/menu'
import type { MenuItem } from '@/types'
import { getDarkMode } from '@/hooks'

interface GlobalState {
  darkMode?: boolean
  isMobile: boolean
  menus: MenuItem[]
  menuExpand: boolean
}

interface GlobalAction {
  setMenuExpand: (expand: boolean) => void
}

export const useGlobalStore = create<GlobalState & GlobalAction>(set => ({
  darkMode: getDarkMode(),
  isMobile: false,
  menuExpand: true,
  menus: cloneDeep(menuConfig),
  setMenuExpand(menuExpand: boolean) {
    set({ menuExpand })
  },
}))
