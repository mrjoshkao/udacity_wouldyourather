/**
 * adapted from github.com/udacity/reactnd-chirper-app
 */

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USERS_ANSWER_SUBMIT = 'USERS/ANSWER_SUBMIT'
export const USERS_ADD_QUESTION = 'USERS/ADD_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addQuestion (formattedQuestion) {
   return {
     type: USERS_ADD_QUESTION, 
     formattedQuestion
   }
}

export function answerSubmit (qid, authedUser,answer) {
  return {
    type: USERS_ANSWER_SUBMIT,
    qid,
    authedUser,
    answer,
  }
}