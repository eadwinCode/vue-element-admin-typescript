import defaultSettings from '@/settings'
import { ISettingsState } from '../interfaces'
import { Store } from 'vuex'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state: ISettingsState = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state: any, { key, value }:any) => {
    if (state.hasOwnProperty(key)) {
        state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }: Store<ISettingsState>, data:any) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

