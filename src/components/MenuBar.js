import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

function handleClick(e, dispatch, setAuthedUser) {
  e.preventDefault(); 
  dispatch(setAuthedUser(null));
}

function MenuBar(props) {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.users)[useSelector((state) => state.authedUser)].name;
  return (
    <div>
      <Link to={'/'}> Home </Link>
      <Link to={'/add'}> New Question </Link>
      <Link to={'/leaderboard'}> Leaderboard </Link>
      <button onClick={(e)=>handleClick(e,dispatch,setAuthedUser)}> Log Out </button>
      <div>
        <h1> Welcome {userName} </h1>
      </div>
    </div>
  )
}

export default MenuBar
