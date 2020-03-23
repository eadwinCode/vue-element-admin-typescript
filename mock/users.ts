
import faker from 'faker'
import { Response, Request, Router }  from 'express'
import { accessTokenAuth } from './security'

const router = Router()

const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

export const register = (req: Request, res: Response) => {
    return res.json({
        code: 20000
    })
}

export const login = (req: Request, res: Response) => {
    const { username } = req.body
    const token = (tokens as {[key: string]: any})[username]

    // mock error
    if (!token) {
        return res.json({
            code: 60204,
            message: 'Account and password are incorrect.'
        })
    }
    return res.json({
        code: 20000,
        data: token
    })
}

export const logout = (req: Request, res: Response) => {
    return res.json({
        code: 20000,
        data: 'success'
    })
}

export const getUserInfo = (req: Request, res: Response) => {
    const { token } = req.query
    const info = (users as {[key: string]: any})[token]
    if (!info) {
        return {
            code: 50008,
            message: 'Login failed, unable to get user details.'
        }
    }
    return res.json({
        code: 20000,
        data: info
    })
}

var matchQueryString = function(req: Request, res: Response, next: any) {
    return next(req.query.token ? null : 'route');
};

router.get('/info', matchQueryString, accessTokenAuth, getUserInfo)
router.post('/login', login)
router.post('/logout', logout)

export default router