/*
 * This component is done using hooks. References:
   https://react-redux.js.org/api/hooks
   https://reactrouter.com/docs/en/v6/getting-started/tutorial#reading-url-params
   https://react-redux.js.org/api/hooks#usedispatch
 */

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PieChart } from 'react-minimal-pie-chart'
import ReactTooltip from 'react-tooltip'
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
            <div> {capFirstLetter(q.optionOne.text)}? </div> OR <div> {capFirstLetter(q.optionTwo.text)}? </div>
  
            <div>
              <ResultGraph optionOne={q.optionOne} optionTwo={q.optionTwo} userChoice={authedUserAnswers[q.id]} votesOne={votesOne} votesTwo={votesTwo}/>
            </div>
          </div> 
          :
          <div><AnswerSelector optionOne={capFirstLetter(q.optionOne.text)} optionTwo={capFirstLetter(q.optionTwo.text)} submitAnswer={submitAnswer}/></div>
      }
    </div>
  )
}

function makeTooltipContent(data) {
  const isOneHundredPercent = data[0].value===0 || data[1].value===0;
  return (data.map((d,index)=>
    (<div>{d.tooltip}: {d.value} {d.value===1?' vote':' votes'} <br/> {isOneHundredPercent?'(No votes for: '+ data[1-index].tooltip + ')':''}</div>)
  ));
}

const ResultGraph = ({optionOne, optionTwo, userChoice, votesOne, votesTwo}) => {
  const [hovered, setHovered] = useState(null);
  const lineWidth = 60;
  const optionOneText = capFirstLetter(optionOne.text);
  const optionTwoText = capFirstLetter(optionTwo.text);
  let data = [
          { value: votesOne, color: '#E38627', tooltip: optionOneText },
          { value: votesTwo, color: '#C13C37', tooltip: optionTwoText },
        ]
  const tooltips = makeTooltipContent(data);
  data = data.filter(d=>d.value!==0);
  
  return(
    <div data-tip="" data-for="chart">
      <PieChart 
        data={data}
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
        labelPosition={100 - lineWidth / 2}
        labelStyle={{
          fill: '#fff',
          opacity: 0.75,
          pointerEvents: 'none',
          fontSize: '10px',
        }}
        radius={PieChart.defaultProps.radius - 6}
        startAngle={90}
        lineWidth={60}
        animate
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
      />
      <ReactTooltip
        id="chart"
        getContent={() =>
          typeof hovered === 'number' ? tooltips[hovered]:null
        }
        multiline={true}
      />
      
      <div>You Selected: {userChoice==="optionOne"?optionOneText:optionTwoText}</div>
    </div>
  )
}

export default QuestionPage;