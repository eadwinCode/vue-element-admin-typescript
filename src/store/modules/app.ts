import { IAppState, DeviceType } from '../interfaces'
import { Store } from 'vuex'
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies'

const state: IAppState = {
  sidebar: {
    opened: getSidebarStatus() !== 'closed',
    withoutAnimation: false
  },
  device: DeviceType.Desktop
}

const mutations = {
  TOGGLE_SIDEBAR: (state: IAppState) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
        setSidebarStatus('opened')
    } else {
        setSidebarStatus('closed')
    }
  },
  CLOSE_SIDEBAR: (state: IAppState, withoutAnimation: boolean) => {
    setSidebarStatus('closed')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: IAppState, device: DeviceType) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }: Store<IAppState>) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }: Store<IAppState>, { withoutAnimation }: { withoutAnimation: boolean}) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }: Store<IAppState>, device: string) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
