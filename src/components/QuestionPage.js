/*
 * This component is done using hooks. References:
   https://react-redux.js.org/api/hooks
   https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
   https://react-redux.js.org/api/hooks#usedispatch
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Checkmark } from 'react-checkmark'
import ResultGraph from './ResultGraph.js'
import AnswerSelector from './AnswerSelector.js'
import { handleAnswerSubmit } from '../actions/shared'
import { capFirstLetter } from '../utils/helpers.js'
import logo from '../images/wyr.png'

function QuestionPage(props) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const q = useSelector((state) => state.questions)[id]
  const users = useSelector((state) => state.users)
  const authedUser = useSelector((state) => state.authedUser)
  
  return(!q ?
    (<div className="Question-Blurb Question-Page">
      <img src={logo} alt="wyr logo" className="App-logo"/>
      <div>404 asks...</div>
      <h2><span className="wyr">Would You Rather...</span></h2>
      <div>Answer nonexistent question?</div>
      OR
      <div>Go back to home?</div>
    </div>)
    :
    handleQuestionPage(id, dispatch, q, users, authedUser))
}

function handleQuestionPage(id, dispatch, q, users, authedUser) {
  const author = users[q.author]
  const authedUserAnswers = authedUser ? users[authedUser].answers : []
  const votesOne = q.optionOne.votes.length
  const votesTwo = q.optionTwo.votes.length
  
  const submitAnswer = (answer) => dispatch(handleAnswerSubmit(id,answer))

  return (
    <div className="Question-Blurb Question-Page">
      <img src={users[q.author].avatarURL} alt={`Avatar of ${author.name}`} className='avatar'></img>
      {author.name} asks:
      <h2><span className="wyr">Would You Rather...</span></h2>
      {
        authedUserAnswers[q.id] ?
          handleAnsweredQuestion(q,authedUserAnswers,votesOne,votesTwo)
          :
          handleUnansweredQuestion(q,submitAnswer)
      }
    </div>
  )
}

const OptionText = ({optionText,userChoice}) => {
  return(
    <div className="Option-Text">
      <span style={{marginTop:"-4px"}}>{capFirstLetter(optionText)}?</span>
      {userChoice?(<div className="cm"><Checkmark size="small"/></div>):''}
    </div>
  )
}

const handleAnsweredQuestion = (q,authedUserAnswers,votesOne,votesTwo) => {
  return (
    <div>
      <OptionText optionText={q.optionOne.text} userChoice={authedUserAnswers[q.id]==="optionOne"}/>
        OR 
      <OptionText optionText={q.optionTwo.text} userChoice={authedUserAnswers[q.id]==="optionTwo"}/>
      <ResultGraph 
       optionOne={q.optionOne} 
       optionTwo={q.optionTwo} 
       userChoice={authedUserAnswers[q.id]} 
       votesOne={votesOne} votesTwo={votesTwo}
      />
    </div> 
  )
}

const handleUnansweredQuestion = (q,submitAnswer) => {
  return(
    <div>
      <AnswerSelector 
        optionOne={capFirstLetter(q.optionOne.text)} 
        optionTwo={capFirstLetter(q.optionTwo.text)} 
        submitAnswer={submitAnswer}
      />
    </div>
  )
}

export default QuestionPage;