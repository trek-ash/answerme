import API from './API'

export default {
  
  multipleAnswers(data, token)   {
    return API().post('/answer/multiple', data, { 'headers': { 'Authorization': "Bearer "+token } })
  },

  getUserAnswers(token)  {
    return API().get('/answer/user', { 'headers': { 'Authorization': "Bearer "+token } })
  },
  getAveragePerQuestion()   {
      return API().get("/answer/stats/average")
  }
}