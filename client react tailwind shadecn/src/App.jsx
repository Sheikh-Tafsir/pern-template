import React, { useState, useEffect } from 'react'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import './App.css'
import Editor from './pages/editor/Editor';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';
import ChatList from './pages/chatlist/ChatList';
import Chat from './pages/chat/Chat';
import Profile from './pages/profile/Profile';
import {useUserContext, UserProvider} from './context/UserContext';
import Projects from './pages/projects/Projects';
import { checkLogin } from './utils/checkLogin';
import PrivateRoute from './utils/PrivateRoute';
import Chats from './pages/chat/Chats';

const App = () => {
  const loggedIn = checkLogin();

  return (
    <>
      
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={ <LandingPage />} exact/>
            <Route path="/login" element={loggedIn ? <Login /> : <Navigate to="/chatlist" replace />} />
            <Route path="/signup" element={loggedIn ? <Signup /> : <Navigate to="/chatlist" replace />} />
            <Route element={<PrivateRoute />}>
                <Route path="/chatlist" element={<ChatList/>} />
                <Route path='/chat' element={<Chat/>} />
                <Route path='/chats' element={<Chats/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/projects" element={<Projects/>} />
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
      

    </>
  )
}

export default App