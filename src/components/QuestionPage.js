/*
 * This component is done using hooks. References:
   https://react-redux.js.org/api/hooks
   https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AnswerSelector from './AnswerSelector.js'

function QuestionPage(props) {
  const { id } = useParams()
  const q = useSelector((state) => state.questions)[id]
  const author = useSelector((state) => state.users)[q.author]
  const authedUser = useSelector((state) => state.authedUser)
  const votesOne = q.optionOne.votes.length
  const votesTwo = q.optionTwo.votes.length
  const totalVotes = votesOne + votesTwo
  return (
    <div>
      {author.name} asks: <br/> {q.optionOne.text} OR {q.optionTwo.text}
      {
        (q.optionOne.votes.includes(authedUser) && <div><h1> You selected: </h1> {q.optionOne.text} <h1>Votes</h1> Option 1: {votesOne}/{totalVotes} Option 2: {votesTwo}/{totalVotes}</div>) ||
        (q.optionTwo.votes.includes(authedUser) && <div><h1> You selected: </h1> {q.optionTwo.text} <h1>Votes</h1> Option 1: {votesOne}/{totalVotes} Option 2: {votesTwo}/{totalVotes}</div>) ||
        <div><h1>Vote: </h1><AnswerSelector /></div>
      }
    </div>
  )
}

export default QuestionPage;