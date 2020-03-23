import request from '@/utils/request'
import pathToRegexp from 'path-to-regexp'
const BASE_URL = '/user'
export interface IloginData{
    username: string,
    password: string
}

export function login(data: IloginData) {
  return request({
    url: `${BASE_URL}/login`,
    method: 'post',
    data
  })
}

export function getInfo(token: string) {
  return request({
    url: `${BASE_URL}/info`,
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: `${BASE_URL}/logout`,
    method: 'post'
  })
}
