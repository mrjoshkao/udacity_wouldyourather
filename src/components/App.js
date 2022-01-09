import React from 'react'
import './App.css';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

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
          : 'Hello!' }
      </div>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
