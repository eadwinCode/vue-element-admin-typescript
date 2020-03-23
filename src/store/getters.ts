import IRootState from './interfaces';

const getters = {
    sidebar: (state:IRootState) => state.app!.sidebar,
    device: (state:IRootState) => state.app!.device,
    token: (state:IRootState) => state.user!.token,
    avatar: (state:IRootState) => state.user!.avatar,
    name: (state:IRootState) => state.user!.name
}

// getter type checker
export enum Getters {
    sidebar='sidebar',
    device='device',
    token='token',
    avatar='avatar',
    name='name',
}

export default getters