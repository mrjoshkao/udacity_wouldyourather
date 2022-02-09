import React from 'react'
import { connect } from 'react-redux'

class ScoreBoard extends React.Component {
  render () {
    const sortedBoard = this.props.scoreBoard.map(
        u => ({...u,totalScore: u.numAnswered+u.numCreated})
      ).sort(
        (a,b)=>(b.totalScore - a.totalScore)
      );
    console.log(sortedBoard);
    return (
      <div>
        <ul className="leaderboard">
          {sortedBoard.map( (u) => 
             (<li key = {u.uid} className="Question-Blurb"> 
                <img src={u.imgUrl} alt={`Avatar of ${u.name}`} className='avatar'></img>
                <h2>{u.userName}</h2>
                <span>Answered: {u.numAnswered}</span>
                <span>Asked: {u.numCreated}</span> 
                <h3>Total: {u.totalScore}</h3>  
              </li>) )}
        </ul>
      </div>
    )
  }
}

function mapStateToProps( { users, authedUser } ) {
   return {
     scoreBoard: Object.values(users).map(u => ({
         uid: u.id,
         userName: u.name,
         numAnswered: Object.keys(u.answers).length,
         numCreated: u.questions.length,
         imgUrl: u.avatarURL,
       })),
     authedUser: authedUser,
   }
}

export default connect(mapStateToProps)(ScoreBoard);