import React from 'react'
import './App.css';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import LoginPage from './LoginPage.js'
import QuestionsPage from './QuestionsPage.js'

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <div className="App">
        <LoadingBar />
        {this.props.loading === true 
          ? ''
          : <div>
              <LoginPage />
              <QuestionsPage />
            </div> }
      </div>
    );
  }
}

function mapStateToProps ({ questions }) {
  return {
    loading: Object.keys(questions).length === 0
  }
}

export default connect(mapStateToProps)(App);
