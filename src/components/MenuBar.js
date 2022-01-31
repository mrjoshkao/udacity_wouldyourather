import React from 'react'
import { Link, NavLink } from 'react-router-dom'
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
    <div className="tabs">
      <div className="tab-list">
        <NavLink to={'/'} className={({isActive})=>{return(isActive?"tab-list-item tab-list-active":"tab-list-item")}}> Home </NavLink>
        <NavLink to={'/add'} className={({isActive})=>{return(isActive?"tab-list-item tab-list-active":"tab-list-item")}}> New Question </NavLink>
        <NavLink to={'/leaderboard'} className={({isActive})=>{return(isActive?"tab-list-item tab-list-active":"tab-list-item")}}> Leaderboard </NavLink>
        Welcome {userName}
        <button className="tab-list-item" onClick={(e)=>handleClick(e,dispatch,setAuthedUser)}> Log Out </button>
      </div>
    </div>
  )
}

export default MenuBar
