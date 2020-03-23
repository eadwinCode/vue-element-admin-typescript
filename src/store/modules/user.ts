import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import { IUserState, IUserStateModule, IloginData } from '../interfaces';
import store from '@/store'
import { getToken, setToken, removeToken } from '@/utils/auth';
import { login, getInfo, logout } from '@/api/user';
import { resetRouter } from '@/router';

const getDefaultState =() => {
    return {
        token: getToken(),
        name: '',
        avatar: ''
    }
}

@Module({ dynamic: true, store, name: 'user' })
class UserState extends VuexModule implements IUserStateModule {

    public user: IUserState = getDefaultState()
    
    get UserAvatar() {
        return this.user.avatar
    }

    get Name() {
        return this.user.name
    }

    @Mutation
    private RESET_STATE() {
        let defaultUser = getDefaultState()
        Object.assign(this.user, defaultUser)
    }

    @Mutation
    private SET_TOKEN(token: string) {
        this.user.token = token
        setToken(token)
    }

    @Mutation
    private SET_NAME(name: string) {
        this.user.name = name
    }

    @Mutation
    private SET_AVATAR(avatar: string) {
        this.user.avatar = avatar
    }

    @Action
    public async login(userInfo: IloginData) {
        const { username, password } = userInfo
        const { data } = await login({ username: username.trim(), password: password })
        this.context.commit('SET_TOKEN', data.token)
    }

    @Action
    public async getInfo() {
        if (this.user.token == undefined) {
            throw Error('GetUserInfo: token is undefined!')
        }
        let { data } = await getInfo(this.user.token!)
        if (!data) {
            throw Error('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        this.context.commit('SET_NAME', name)
        this.context.commit('SET_AVATAR', avatar)
    }

    @Action
    public async logout() {
        await logout()
        removeToken() // must remove  token  first
        resetRouter()
        this.context.commit('RESET_STATE')
    }

    @Action
    public async resetToken() {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            this.context.commit('RESET_STATE')
            resolve()
        })
    }

}

export const UserStateModule: IUserStateModule = getModule(UserState)