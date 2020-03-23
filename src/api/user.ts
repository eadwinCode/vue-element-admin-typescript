import request from '@/utils/request'
import pathToRegexp from 'path-to-regexp'
import { IloginData } from '@/store/interfaces'
const BASE_URL = '/user'


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
