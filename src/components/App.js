import { React, useEffect } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import LoginPage from './LoginPage.js'
import Dashboard from './Dashboard.js'
import QuestionPage from './QuestionPage.js'
import NewQuestion from './NewQuestion.js'
import MenuBar from './MenuBar.js'
import ScoreBoard from './ScoreBoard.js'
import RequireAuth from './RequireAuth.js'

function App(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=>state.loading);
    
  useEffect(()=> {
    dispatch(handleInitialData())
  },[dispatch])
  
    return (
          <div className="App">
            <Router>
              <MenuBar />
              <LoadingBar />
                { 
                (isLoading ? '' :
                 <div>
                    <Routes>
                      <Route path='/' element={<RequireAuth><Dashboard/></RequireAuth>} />
                      <Route path='/question/:id' element={<RequireAuth><QuestionPage/></RequireAuth>} />
                      <Route path='/add' element={<RequireAuth><NewQuestion/></RequireAuth>} />
                      <Route path='/leaderboard' element={<ScoreBoard/>} />
                      <Route path='/login' element={<LoginPage />} />
                    </Routes>
                  </div>)
                }
            </Router>
          </div>
    );
}

export default App;
