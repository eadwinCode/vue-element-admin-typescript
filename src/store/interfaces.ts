export interface IloginData{
    username: string,
    password: string
}

export interface IUserState {
    token: string | undefined,
    name: string,
    avatar: string
}

export interface IUserStateModule {
    user: IUserState
    UserAvatar: any
    Name: any
    resetToken: () => Promise<any>
    logout: () => Promise<any>
    getInfo: () => Promise<void>
    login: (userdata: IloginData) => Promise<void>
}

export interface ISettingsState {
    title?: string;
    fixedHeader: boolean;
    sidebarLogo: boolean;
    showSettings: boolean;
}

export interface ISettingsStateModule extends ISettingsState {
    changeSetting: (data:{key: keyof ISettingsState, value: any}) => void
}

export enum DeviceType {
    Mobile,
    Desktop,
}
export interface ISidebar{
    opened?: boolean,
    withoutAnimation?: boolean
}

export interface IAppState{
    // states
    sidebar: ISidebar
    device: DeviceType
    
}

export interface IAppStateModule extends IAppState{
    // actions
    toggleDevice: (device: DeviceType) => void
    closeSideBar: (obj:{ withoutAnimation: boolean }) => void
    toggleSideBar: () => void
}

export default interface IRootState{
    app: IAppStateModule,
    user:  IUserStateModule,
    settings: ISettingsStateModule
}