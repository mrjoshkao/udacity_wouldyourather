/*
 * This component is done using hooks. References:
   https://react-redux.js.org/api/hooks
   https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
   https://react-redux.js.org/api/hooks#usedispatch
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import AnswerSelector from './AnswerSelector.js'
import { handleAnswerSubmit } from '../actions/shared'
import capFirstLetter from '../utils/helpers.js'

function QuestionPage(props) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const q = useSelector((state) => state.questions)[id]
  const users = useSelector((state) => state.users)
  const authedUser = useSelector((state) => state.authedUser)
  
  if(!q)
    return(<h2> Error: Question does not exist </h2>)
  
  const author = users[q.author]
  const authedUserAnswers = authedUser ? users[authedUser].answers : []
  const votesOne = q.optionOne.votes.length
  const votesTwo = q.optionTwo.votes.length
  const totalVotes = votesOne + votesTwo
  
  const submitAnswer = (answer) => dispatch(handleAnswerSubmit(id,answer))
  
  return (
    <div className="Question-Blurb Question-Page">
      <div> {author.name} asks:</div> <div> {capFirstLetter(q.optionOne.text)} </div> OR <div> {capFirstLetter(q.optionTwo.text)} </div>
      {
        authedUserAnswers[q.id] ?
          <div><h2> You selected: </h2> {capFirstLetter(q[authedUserAnswers[q.id]].text)} <h2>Votes</h2> Option 1: {votesOne}/{totalVotes} Option 2: {votesTwo}/{totalVotes}</div> 
          :
          <div><h2>Vote: </h2><AnswerSelector optionOne={capFirstLetter(q.optionOne.text)} optionTwo={capFirstLetter(q.optionTwo.text)} submitAnswer={submitAnswer}/></div>
      }
    </div>
  )
}

export default QuestionPage;