import React from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class LoginPage extends React.Component {
  handleChange = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    e.target.value === '' ? console.log('hello') : dispatch(setAuthedUser(e.target.value))
  }
  
  render () {
    return(
      <div className="Login">
        <h2>Would You Rather Login</h2>
        <img src="https://udacity-wyr.000webhostapp.com/question-27106_1280.png" alt="wyr logo" className="App-logo"/>
        <select onChange = {this.handleChange}>
          <option value=''> Select a user </option>
          {this.props.users.map( (u) => (<option key = { u.id } value = { u.id }> {u.name} </option>)) }
        </select>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users : Object.values(users),
  }
}

export default connect(mapStateToProps)(LoginPage);