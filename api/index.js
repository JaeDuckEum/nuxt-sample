import axios from 'axios'
import { getJwt } from '~/util/SessionManager'

const API_ADDR = 'http://localhost:9000'

const headers = () => {
  const jwt = getJwt()
  return {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Access-Token': jwt,
  }
}

export const getUserInfo = () => {
  return axios.get(`${API_ADDR}/user/info`, { headers: headers() })
}

// 컨텐츠 전체조회
export const getContents = () => {
  return axios.get(`${API_ADDR}/contents`)
}

// 컨텐츠 조회 (path 파라미터)
export const getContent = ({ contentId }) => {
  return axios.get(`${API_ADDR}/contents/${contentId}`)
}

// // 컨텐츠 조회 (query 파라미터)
// export const getContent = ({ contentId }) => {
//   console.log(contentId)
//   return axios.get(`${API_ADDR}/contents/`, {
//     params: { contentId },
//   })
// }

// 컨텐츠 추가
export const createContent = ({ title, content }) => {
  return axios.post(
    `${API_ADDR}/contents`,
    {
      title,
      content,
    },
    { headers: headers() }
  )
}
