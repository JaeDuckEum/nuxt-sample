export const EndPoint = {
  // 관리자 로그인
  POST_ADMIN_LOGIN: `http://localhost:9001/admins/login`,
}

const TempAdminApiMap = {
  get: {},
  post: {
    [EndPoint.POST_ADMIN_LOGIN]: {},
  },
  patch: {},
  put: {},
  delete: {},
}

export default TempAdminApiMap
