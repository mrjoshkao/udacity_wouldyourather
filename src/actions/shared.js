/**
 * adapted from github.com/udacity/reactnd-chirper-app
*/

import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers, addQuestion as uAddQuestion, answerSubmit as uAnswerSubmit } from '../actions/users'
import { receiveQuestions, addQuestion as qAddQuestion, answerSubmit as qAnswerSubmit } from '../actions/questions'
import { setLoadingTrue, setLoadingFalse } from '../actions/loading'
import { showLoading, hideLoading } from 'react-redux-loading'
import { cacheImages } from '../utils/helpers.js'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    
    console.log('start cache images');
    cacheImages();
    console.log('end cache images');
    
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      }).then(() => dispatch(setLoadingFalse()))
  }
}


export function handleAnswerSubmit(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    
    dispatch(showLoading())
    
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then(
        dispatch(uAnswerSubmit(qid, authedUser, answer))
      ).then(
        dispatch(qAnswerSubmit(qid, authedUser, answer))
      ).then(() =>
        dispatch(hideLoading())
      )
  }
}


export function handleAddQuestion(optionOne, optionTwo, setToHome) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    
    dispatch(showLoading())
    
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    }).then((formattedQuestion)=>{
        dispatch(uAddQuestion(formattedQuestion));
        dispatch(qAddQuestion(formattedQuestion));
      }).then(() =>
        dispatch(hideLoading())
      )
  }
}