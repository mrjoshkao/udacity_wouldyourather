/** 
 * adapted from github.com/udacity/reactnd-chirper-app
 */

import { RECEIVE_USERS, USERS_ANSWER_SUBMIT, USERS_ADD_QUESTION } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case USERS_ANSWER_SUBMIT :
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }
    case USERS_ADD_QUESTION :
      return {
        ...state,
        [action.formattedQuestion.author]: {
          ...state[action.formattedQuestion.author],
          questions: state[action.formattedQuestion.author].questions.concat([action.formattedQuestion.id])
        }
      }
    default :
      return state
  }
}