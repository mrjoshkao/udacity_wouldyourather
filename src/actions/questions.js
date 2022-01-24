/*
 * adapted from github.com/udacity/reactnd-chirper-app
 */

import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { handleInitialData } from '../actions/shared'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_SUBMIT = 'ANSWER_SUBMIT'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function handleAddQuestion(optionOne, optionTwo, setToHome) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    }).then(
      dispatch(handleInitialData())
    )
  }
}

function answerSubmit (qid, authedUser,answer) {
  return {
    type: ANSWER_SUBMIT,
    qid,
    authedUser,
    answer,
  }
}

export function handleAnswerSubmit(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then(
        dispatch(handleInitialData())
      )
  }
}
