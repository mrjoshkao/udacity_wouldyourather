import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

function handleClick(e, dispatch, setAuthedUser) {
  e.preventDefault(); 
  dispatch(setAuthedUser(null));
}

function MenuBar(props) {
  const dispatch = useDispatch()
  const authedUser = useSelector((state) => state.authedUser)
  const users = useSelector((state) => state.users)
  const userName = authedUser ? users[authedUser].name : null
  const activeStyle = (_isActive) => {return(_isActive?"tab-list-item tab-list-active":"tab-list-item navbar-item")}
  const navigate = useNavigate()
  
  return (
    <div className="tabs navbar">
      <div className="tab-list">
        <div className="tab-wrapper">
          <NavLink to={'/'} className={({isActive})=>activeStyle(isActive)}> Home </NavLink>
        </div>
        <div className="tab-wrapper">
          <NavLink to={'/add'} className={({isActive})=>activeStyle(isActive)}> New Question </NavLink>
        </div>
        <div className="tab-wrapper">
          <NavLink to={'/leaderboard'} className={({isActive})=>activeStyle(isActive)}> Leaderboard </NavLink>
        </div>
        <div className="tab-list-item navbar-item tab-wrapper" style={{alignSelf:"flex-end",marginLeft:"auto"}}>

        { authedUser ? (
            <div>
              <span style={{padding:"0.5em 0.5em"}}> {"Welcome " + userName} </span>
              <span className="navbar-logout" onClick={(e)=>handleClick(e,dispatch,setAuthedUser)}> Log Out </span>
            </div>
          ) : (
            <div>
              <span className="navbar-logout" onClick={(e)=>navigate('/login')}> Log In </span>
            </div>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default MenuBar
