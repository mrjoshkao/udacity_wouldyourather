/**
 * adapted from github.com/udacity/reactnd-chirper-app
 */

import { RECEIVE_QUESTIONS, QUESTIONS_ANSWER_SUBMIT, QUESTIONS_ADD_QUESTION } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case QUESTIONS_ANSWER_SUBMIT :
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([action.authedUser])
          }
        }
      }
    case QUESTIONS_ADD_QUESTION :
      return {
        ...state,
        [action.formattedQuestion.id]: action.formattedQuestion
      }
    default :
      return state
  }
}
