import React from 'react'
import { connect } from 'react-redux'
import QuestionBlurbs from './QuestionBlurbs.js'

class QuestionsPage extends React.Component {
  render() {
    
    const answeredQuestionsKeys = Object.keys(this.props.answers)
    const answeredQuestions = answeredQuestionsKeys.map( (key) =>  this.props.questions[key] ) 
    
    /*https://www.codegrepper.com/code-examples/javascript/remove+common+elements+from+two+arrays+javascript*/
    const unansweredQuestions = Object.keys(this.props.questions).filter(val => !answeredQuestionsKeys.includes(val)).map( (key) => this.props.questions[key] ) 

    
    return (
      <div>
        <h1> Answered Questions </h1>
          <QuestionBlurbs users={this.props.users} questions={answeredQuestions}/>
        <h1> Unanswered Questions </h1>
          <QuestionBlurbs users={this.props.users} questions={unansweredQuestions}/>
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

export default connect(mapStateToProps)(QuestionsPage);