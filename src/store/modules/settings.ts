import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { ISettingsState, ISettingsStateModule } from '../interfaces';
import store from '@/store'
import defaultSettings from '@/settings'
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

@Module({dynamic: true, store , name: 'settings'})
class SettingsState extends VuexModule implements ISettingsStateModule{
    public fixedHeader = fixedHeader;
    public sidebarLogo = sidebarLogo;
    public showSettings = showSettings;

    @Mutation
    private CHANGE_SETTING(data: { key:string , value: any }){
        const { key, value } = data
        if (this.hasOwnProperty(key)) {
            (this as {[key: string]: any})[key] = value
        }
    }

    @Action
    public changeSetting(data:{key: keyof ISettingsState, value: any}) {
        this.context.commit('CHANGE_SETTING', data)
    }
}

export const SettingsStateModule:ISettingsStateModule  = getModule(SettingsState)