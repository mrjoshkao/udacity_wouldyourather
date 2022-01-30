/*
 * adapted from github.com/udacity/reactnd-chirper-app
 */

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const QUESTIONS_ANSWER_SUBMIT = 'QUESTIONS/ANSWER_SUBMIT'
export const QUESTIONS_ADD_QUESTION = 'QUESTIONS/ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestion (formattedQuestion) {
   return {
     type: QUESTIONS_ADD_QUESTION, 
     formattedQuestion
   }
}


export function answerSubmit (qid, authedUser,answer) {
  return {
    type: QUESTIONS_ANSWER_SUBMIT,
    qid,
    authedUser,
    answer,
  }
}

