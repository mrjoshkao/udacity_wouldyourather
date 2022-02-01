import React from 'react'
import { connect } from 'react-redux'
import QuestionBlurbs from './QuestionBlurbs.js'
import Tabs from './Tabs.js'

class Dashboard extends React.Component {
  render() {
    
    const answeredQuestionsKeys = Object.keys(this.props.answers)
    const answeredQuestions = answeredQuestionsKeys.map( (key) =>  this.props.questions[key] ) 
    
    /*https://www.codegrepper.com/code-examples/javascript/remove+common+elements+from+two+arrays+javascript*/
    const unansweredQuestions = Object.keys(this.props.questions).filter(val => !answeredQuestionsKeys.includes(val)).map( (key) => this.props.questions[key] ) 

    
    return (
      <div>
        <Tabs>
          <div label="Answered Questions">
            <QuestionBlurbs users={this.props.users} questions={answeredQuestions}/>
          </div>
          <div label="Unanswered Questions">
            <QuestionBlurbs users={this.props.users} questions={unansweredQuestions}/>
          </div>
      </Tabs>
      </div>
    )
  }
}

function mapStateToProps ( { authedUser, users, questions } ) {
  return {
    users : users,
    answers : authedUser === null || users[authedUser].answers,
    questions : questions,
  }
}

export default connect(mapStateToProps)(Dashboard);