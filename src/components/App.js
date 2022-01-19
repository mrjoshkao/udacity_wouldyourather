import React from 'react'
import './App.css';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage.js'
import QuestionsPage from './QuestionsPage.js'
import QuestionPage from './QuestionPage.js'

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <Router className="App">
        <LoadingBar />
        {this.props.loading === true 
          ? ''
          : <div>
              <Routes>
                <Route path='/' element={<div><LoginPage /> <QuestionsPage /></div>} />
                <Route path='/question/:id' element={<QuestionPage/>} />
              </Routes>
            </div> }
      </Router>
    );
  }
}

function mapStateToProps ({ questions }) {
  return {
    loading: Object.keys(questions).length === 0
  }
}

export default connect(mapStateToProps)(App);
