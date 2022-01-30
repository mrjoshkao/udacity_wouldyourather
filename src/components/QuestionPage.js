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

function QuestionPage(props) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const q = useSelector((state) => state.questions)[id]
  const users = useSelector((state) => state.users)
  const authedUser = useSelector((state) => state.authedUser)
  
  if(!q)
    return(<h1> Error: Question does not exist </h1>)
  
  const author = users[q.author]
  const authedUserAnswers = authedUser ? users[authedUser].answers : []
  const votesOne = q.optionOne.votes.length
  const votesTwo = q.optionTwo.votes.length
  const totalVotes = votesOne + votesTwo
  
  const submitAnswer = (answer) => dispatch(handleAnswerSubmit(id,answer))
  
  return (
    <div>
      {author.name} asks: <br/> {q.optionOne.text} OR {q.optionTwo.text}
      {
        authedUserAnswers[q.id] ?
          <div><h1> You selected: </h1> {q[authedUserAnswers[q.id]].text} <h1>Votes</h1> Option 1: {votesOne}/{totalVotes} Option 2: {votesTwo}/{totalVotes}</div> 
          :
          <div><h1>Vote: </h1><AnswerSelector optionOne={q.optionOne.text} optionTwo={q.optionTwo.text} submitAnswer={submitAnswer}/></div>
      }
    </div>
  )
}

export default QuestionPage;