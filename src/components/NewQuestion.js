import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Navigate } from 'react-router-dom'

function handleSubmit(e,info,setToHome,dispatch) {
  e.preventDefault();
  console.log(info);
  dispatch(handleAddQuestion(info.optionOne,info.optionTwo))
  setToHome(true);
}

function NewQuestion(props) {
  const authedUser = useSelector((state) => state.authedUser)
  const dispatch = useDispatch()
  const [textOne, setTextOne] = React.useState('');
  const [textTwo, setTextTwo] = React.useState('');
  const [toHome, setToHome] = React.useState(false);
  
  if (toHome === true) {
    return <Navigate to='/' />
  }
  
  return(
    <div>
      <h1> New Question </h1>
      <form onSubmit={(e) => handleSubmit(e,{optionOne:textOne, optionTwo:textTwo, authedUser: authedUser},setToHome,dispatch)}>
        <textarea
          placeholder="What's the first option?"
          value={textOne}
          onChange={(e)=>setTextOne(e.target.value)}
        />
        <textarea
          placeholder="What's the second option?"
          value={textTwo}
          onChange={(e)=>setTextTwo(e.target.value)}
        />
        <button
          type='submit'
          disabled={textOne ==='' || textTwo === ''}>
            Submit
        </button>
      </form>
    </div>
  )
}

export default NewQuestion