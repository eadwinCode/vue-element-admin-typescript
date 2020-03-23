import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { IAppState, ISidebar, DeviceType, IAppStateModule } from '../interfaces';
import { getSidebarStatus, setSidebarStatus } from '@/utils/cookies';
import store from '@/store'

@Module({ dynamic: true, store, name: 'app' })
class AppState extends VuexModule implements IAppStateModule {
    public sidebar: ISidebar = {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false
    }

    public device: DeviceType = DeviceType.Desktop;

    @Mutation private TOGGLE_SIDEBAR() {
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.withoutAnimation = false
        if (this.sidebar.opened) {
            setSidebarStatus('opened')
        } else {
            setSidebarStatus('closed')
        }
    }

    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation: boolean) {
        setSidebarStatus('closed')
        this.sidebar.opened = false
        this.sidebar.withoutAnimation = withoutAnimation
    }

    @Mutation
    private TOGGLE_DEVICE(device: DeviceType) {
        this.device = device
    }

    @Action({ commit: 'TOGGLE_SIDEBAR' })
    public toggleSideBar() {

    }

    @Action({ commit: 'CLOSE_SIDEBAR' })
    public closeSideBar({ withoutAnimation }: { withoutAnimation: boolean }) {
        return withoutAnimation;
    }

    @Action
    public toggleDevice(device: DeviceType) {
        this.context.commit('TOGGLE_DEVICE', device)
    }
}

export const AppStateModule: IAppStateModule = getModule(AppState)