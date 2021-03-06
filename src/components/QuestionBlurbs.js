import { React, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { capFirstLetter } from '../utils/helpers.js'
import logo from '../images/wyr.png'


function QuestionBlurbs(props) {
  const { users, questions } = props
  
  /**
   *  source: https://reactjs.org/docs/hooks-effect.html
   */
  useEffect(()=> {
    window.scrollTo(0, 0)
  })
  
  return(
    questions.length === 0 
    ? (<div className="tab-content"><div className="tab-content Question-Blurb">
         <img src={logo} alt="wyr logo" className="App-logo"/>
         <h2>Nothing here!</h2>
       </div></div>)
    :(<div>
      <ul className="tab-content">
        {questions.sort((a,b) => (b.timestamp - a.timestamp)).map( (q) => 
           (<li key = {q.id} className="Question-Blurb"> 
              <img src={users[q.author].avatarURL} alt={`Avatar of ${users[q.author].name}`} className='avatar'></img>
              <div>{users[q.author].name} asks: </div> <div>{capFirstLetter(q.optionOne.text)+"?"}</div> OR <div>{capFirstLetter(q.optionTwo.text)+"?"}</div> 
                <Link to={`/question/${q.id}`} className="navbar-logout" style={{color:"black"}}>
                  View Question
                </Link>
            </li>) )}
      </ul>
    </div>)
  )
}

export default QuestionBlurbs