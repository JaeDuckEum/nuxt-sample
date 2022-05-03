export const EndPoint = {
  // 유저 로그인
  POST_USER_LOGIN: `http://localhost:9000/user/login`,
}

const TempAdminApiMap = {
  get: {},
  post: {
    [EndPoint.POST_USER_LOGIN]: {},
  },
  patch: {},
  put: {},
  delete: {},
}

export default TempAdminApiMap
