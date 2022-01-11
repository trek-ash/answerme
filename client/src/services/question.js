import API from './API'

export default {
  
  allQuestions()   {
    return API().get('/questions')
  },
}