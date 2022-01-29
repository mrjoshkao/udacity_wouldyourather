/**
 * adapted from github.com/udacity/reactnd-chirper-app
 */

import { RECEIVE_QUESTIONS, ANSWER_SUBMIT, ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ANSWER_SUBMIT :
      return {
        
      }
    case ADD_QUESTION :
      return {
      }
    default :
      return state
  }
}
