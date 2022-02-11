import { React } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import logo from '../images/wyr.png'

function LoginPage(props) {  
  const users = useSelector((state) => Object.values(state.users));
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    e.preventDefault()
    e.target.value === '' ? console.log('hello') : dispatch(setAuthedUser(e.target.value)) && navigate(state?.path || "/")
  }
     
  return(
    <div className="Login">
      <h2><span className="wyr">Would You Rather...</span> Login</h2>
      <img src={logo} alt="wyr logo" className="App-logo"/>
      <p><select onChange = {handleChange}>
        <option value=''> Select a user </option>
         {users.map( (u) => (<option key = { u.id } value = { u.id }> {u.name} </option>)) }
      </select></p>
    </div>
  )
}

export default LoginPage;