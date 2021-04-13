import axios from 'axios'
import { Message } from 'element-ui'

axios.interceptors.response.use(res => {
  if (res.status && res.status === 200 && res.data.status === 500) {
    Message.error({
      message: res.data.msg
    })
    return
  }
  return res.data
}, error => {
  if (error.response.status === 504 || error.response.status === 404) {
    Message.error({
      message: '服务器被吃了( ╯□╰ )'
    })
  } else if (error.response.status === 403) {
    Message.error({
      message: '权限不足，请联系管理员'
    })
  } else if (error.response.status === 401) {
    Message.error({
      message: '尚未登录，请登录'
    })
  } else {
    if (error.response.data.msg) {
      Message.error({
        message: error.response.data.msg
      })
    } else {
      Message.error({
        message: '未知错误！╮(╯▽╰)╭'
      })
    }
  }
  return
})

const baseURL = ''

export const postKeyValueRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${baseURL}${url}`,
    data: params,
    transformRequest: [
      data => {
        let ret = ''
        for (let i in data) {
          ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
        }
        console.log(ret)
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
