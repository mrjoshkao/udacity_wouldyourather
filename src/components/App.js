import React from 'react'
import './App.css';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage.js'
import Dashboard from './Dashboard.js'
import QuestionPage from './QuestionPage.js'
import NewQuestion from './NewQuestion.js'
import MenuBar from './MenuBar.js'
import ScoreBoard from './ScoreBoard.js'

class App extends React.Component {
  state = {
    lastQuestionTimeStamp: 0
  }
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    if(this.props.loggedIn === true) 
      return (
        <div>
        <Router>
          <MenuBar/>
          <LoadingBar />
          {this.props.loading === true 
            ? ''
            : <div className="App">
                <Routes>
                  <Route path='/' element={<Dashboard/>} />
                  <Route path='/question/:id' element={<QuestionPage/>} />
                  <Route path='/add' element={<NewQuestion/>} />
                  <Route path='/leaderboard' element={<ScoreBoard/>} />
                </Routes>
              </div> }
        </Router>
        </div>
      );
    else
      return (<div><LoadingBar /><LoginPage /></div>) 
  }
}

function mapStateToProps ({ loadingBar, authedUser }) {
  return {
    loading: loadingBar.default === 1,
    loggedIn: authedUser !== null,
  }
}

export default connect(mapStateToProps)(App);
