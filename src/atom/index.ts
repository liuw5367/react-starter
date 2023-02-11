import { atom } from 'jotai';
import { cloneDeep } from 'lodash';

import { menuConfig } from '@/config/menu';

export const menusAtom = atom(cloneDeep(menuConfig));

export const mobileAtom = atom(false);
