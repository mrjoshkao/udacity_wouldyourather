import React from 'react'
import { Link } from 'react-router-dom'

function QuestionBlurbs(props) {
  const { users, questions } = props
  
  return(
    <div>
      <ul>
        {questions.sort((a,b) => (b.timestamp - a.timestamp)).map( (q) => 
           (<li key = {q.id}> 
              <img src={users[q.author].avatarURL} alt={`Avatar of ${users[q.author].name}`} className='avatar'></img>
              {users[q.author].name} asks: <br/> {q.optionOne.text} OR {q.optionTwo.text} 
              <br/> 
                <Link to={`/question/${q.id}`}>
                  View Question
                </Link>
              <br/>  
            </li>) )}
      </ul>
    </div>
  )
}

export default QuestionBlurbs