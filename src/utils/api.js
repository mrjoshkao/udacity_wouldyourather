/**
 * Adapted from github.com/udacity/reactnd-chirper-app
 */

import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => {
      return ({
        users,
        questions,
    })
  })
}
/*
 * info = { optionOneText:[STRING], optionTwoText:[STRING], author:[STRING] }
 */
export function saveQuestion (info) {
  return _saveQuestion(info)
}

/*
 * info = { authedUser, qid, answer }
 */
export function saveQuestionAnswer (info) {
  return _saveQuestionAnswer(info)
}