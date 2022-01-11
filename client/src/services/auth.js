import API from './API'

export default {
  
  login(data)   {
    return API().post('/auth/login', data)
  },
  signup(data)   {
    return API().post('/auth/signup', data)
  },
}