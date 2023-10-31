import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AccountPage } from './pages/AccountPage.js';
import { LandingPage } from './pages/LandingPage.js';
import { MyQuestionsPage } from './pages/MyQuestionsPage.js';
import { UserProvider } from './components/UserProvider';
import { ToastProvider } from './components/ToastProvider';

function App() {
  return (
    <UserProvider>
    <ToastProvider>
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/myquestions" element={<MyQuestionsPage/>} />
      <Route path="/account" element={<AccountPage />} />
    </Routes>
    </Router>
    </ToastProvider>
    </UserProvider>
  );
}

export default App;