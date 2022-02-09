/*
 *  https://reactrouter.com/docs/en/v6/api#usenavigate
 */ 

import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import { useNavigate } from 'react-router-dom'

function handleSubmit(e,info,navigate,dispatch) {
  e.preventDefault();
  console.log(info);
  dispatch(handleAddQuestion(info.optionOne,info.optionTwo))
  navigate('/')
}

function NewQuestion(props) {
  const authedUser = useSelector((state) => state.authedUser)
  const dispatch = useDispatch()
  const [textOne, setTextOne] = React.useState('');
  const [textTwo, setTextTwo] = React.useState('');
  
  const navigate = useNavigate();
  
  return(
    <div className="Question-Blurb Question-Page">
      <h2><span className="wyr">Would You Rather...</span></h2>
      <form 
        onSubmit={
          (e) => handleSubmit(e,{optionOne:textOne, optionTwo:textTwo, authedUser: authedUser},navigate,dispatch)
        }
        >
        <textarea
          placeholder="What's the first option?"
          value={textOne}
          onChange={(e)=>setTextOne(e.target.value)}
          className="New-Question"
        />
        <textarea
          placeholder="What's the second option?"
          value={textTwo}
          onChange={(e)=>setTextTwo(e.target.value)}
          className="New-Question"
        />
        <div>
          <button
            className="tab-list-item navbar-logout"
            type='submit'
            disabled={textOne ==='' || textTwo === ''}>
              Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewQuestion