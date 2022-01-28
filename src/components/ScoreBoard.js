import React from 'react'
import { connect } from 'react-redux'

class ScoreBoard extends React.Component {
  render () {
   return (
     <div>
     {this.props.numAnswered}
     <br></br>
     {this.props.numCreated}
     </div>
   )
  }
}

function mapStateToProps( { users, authedUser } ) {
   return {
     numAnswered: Object.keys(users[authedUser].answers).length,
     numCreated: users[authedUser].questions.length,
   }
}

export default connect(mapStateToProps)(ScoreBoard);