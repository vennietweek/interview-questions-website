import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProfilePage } from './pages/ProfilePage.js';
import { LoginPage } from './pages/LoginPage.js';
import { LandingPage } from './pages/LandingPage.js';
import { MyQuestionsPage } from './pages/MyQuestionsPage.js';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/myquestions" element={<MyQuestionsPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
    </Router>
  );
}

export default App;

