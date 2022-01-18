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
      <div>
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