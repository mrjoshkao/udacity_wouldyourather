import React from 'react'
import './App.css';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import LoginPage from './LoginPage.js'
import Dashboard from './Dashboard.js'
import QuestionPage from './QuestionPage.js'
import NewQuestion from './NewQuestion.js'

class App extends React.Component {
  state = {
    lastQuestionTimeStamp: 0
  }
  
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
                <Route path='/' element={<div><LoginPage /> <Dashboard /> <Link to={'/new'} > New Question </Link></div>} />
                <Route path='/question/:id' element={<QuestionPage/>} />
                <Route path='/new' element={<NewQuestion/>} />
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
