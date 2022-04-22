import axios from 'axios'

const API_ADDR = 'http://localhost:9000'

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
export const createContent = ({ userId, title, content }) => {
  return axios.post(`${API_ADDR}/contents`, {
    userId,
    title,
    content,
  })
}
