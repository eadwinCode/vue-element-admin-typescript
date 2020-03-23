export interface IUserState {
    token: string | undefined,
    name: string,
    avatar: string
}

export interface ISettingsState {
    title?: string;
    fixedHeader: boolean;
    sidebarLogo: boolean;
    showSettings: boolean;
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
    sidebar: ISidebar,
    device: DeviceType,
}

export default interface IRootState{
    app?: IAppState,
    user?: IUserState,
    settings?: ISettingsState
}