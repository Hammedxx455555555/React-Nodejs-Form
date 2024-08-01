// eslint-disable-next-line no-unused-vars
import React from 'react'
import Login from './frontend/login';
import Signup from './frontend/signup';
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Home from './frontend/Home';
const App = ()=> {
  return (
    <>

    <Router>
          <Routes>
               <Route path='/' Component={Signup}/>
               <Route path='/login' Component={Login}/>
               <Route path='/home' Component={Home}/>
          </Routes>
    </Router>
  
    </>
  )
}
export default App;
      
 

