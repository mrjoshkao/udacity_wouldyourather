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
  
  if(!q)
    return(
      <div className="Question-Blurb Question-Page">
        <img src={logo} alt="wyr logo" className="App-logo"/>
        <h2> Error: Question does not exist </h2>
      </div>)
  
  const author = users[q.author]
  const authedUserAnswers = authedUser ? users[authedUser].answers : []
  const votesOne = q.optionOne.votes.length
  const votesTwo = q.optionTwo.votes.length
  
  const submitAnswer = (answer) => dispatch(handleAnswerSubmit(id,answer))

  return (
    <div className="Question-Blurb Question-Page">
      <img src={users[q.author].avatarURL} alt={`Avatar of ${author.name}`} className='avatar'></img>
      {author.name} asks:
      <h2>Would you rather...</h2>
      {
        authedUserAnswers[q.id] ?
          <div>
          
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
              <span style={{marginTop:"-4px"}}>{capFirstLetter(q.optionOne.text)}?</span>
              <div className="cm"><Checkmark size="small"/></div>
            </div> 
            OR 
            <div> 
              {capFirstLetter(q.optionTwo.text)}? 
            </div>
  
            <div>
              <ResultGraph 
                optionOne={q.optionOne} 
                optionTwo={q.optionTwo} 
                userChoice={authedUserAnswers[q.id]} 
                votesOne={votesOne} votesTwo={votesTwo}
              />
            </div>
          </div> 
          :
          <div>
            <AnswerSelector 
              optionOne={capFirstLetter(q.optionOne.text)} 
              optionTwo={capFirstLetter(q.optionTwo.text)} 
              submitAnswer={submitAnswer}
            />
          </div>
      }
    </div>
  )
}
export default QuestionPage;