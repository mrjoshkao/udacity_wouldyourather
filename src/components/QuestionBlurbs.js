import React from 'react'

function QuestionBlurbs(props) {
  const { users, questions } = props
  
  return(
    <div>
      <ul>
        {questions.map( (q) => (<li key = {q.id}> {users[q.author].name} asks: {q.optionOne.text} OR {q.optionTwo.text} </li>) )}
      </ul>
    </div>
  )
}

export default QuestionBlurbs