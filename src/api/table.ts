import request from '@/utils/request'
const BASE_URL = '/table'


export function getList(params:any=null) {
  return request({
    url: `${BASE_URL}/list`,
    method: 'get',
    params
  })
}