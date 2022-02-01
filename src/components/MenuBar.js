import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

function handleClick(e, dispatch, setAuthedUser) {
  e.preventDefault(); 
  dispatch(setAuthedUser(null));
}

function MenuBar(props) {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.users)[useSelector((state) => state.authedUser)].name;
  const activeStyle = (_isActive) => {return(_isActive?"tab-list-item tab-list-active":"tab-list-item navbar-item")}
  
  return (
    <div className="tabs navbar">
      <div className="tab-list">
        <NavLink to={'/'} className={({isActive})=>activeStyle(isActive)}> Home </NavLink>
        <NavLink to={'/add'} className={({isActive})=>activeStyle(isActive)}> New Question </NavLink>
        <NavLink to={'/leaderboard'} className={({isActive})=>activeStyle(isActive)}> Leaderboard </NavLink>
        <div className="tab-list-item navbar-item" style={{float:"right"}}>
          <span style={{padding:"0.5em 0.5em"}}> Welcome {userName} </span>
          <span className="navbar-logout" onClick={(e)=>handleClick(e,dispatch,setAuthedUser)}> Log Out </span>
        </div>
      </div>
    </div>
  )
}

export default MenuBar
