import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Admin from './components/Admin';

const App = () => {
  // creates a state called user (initially null).
  // setUser is a function that updates user.
  const [user, setUser] = useState(null);

  // useEffect runs only once when the page loads.
  // localStorage.getItem('user') → Checks if a user is already saved (from a previous login).
  // JSON.parse(savedUser) → Converts the stored user back into an object.
  useEffect(() => {
    
  }, []);

  return (
    // <Router> → Enables navigation (switching between pages).
    // <Routes> → Holds all our page routes.
    <Router>
      <Routes>

        {/* Passes setUser to Login (so login can update the user). */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Protected Route for Home */}
        <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/login" />} />

        {/* Route for Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* If the user enters an invalid page, redirect them to /login. */}
        <Route path="*" element={<Navigate to="/login" />} />

        {/* Protected Route for Admin */}
        <Route path="/admin" element={user && user.email === 'admin' ? <Admin /> : <Navigate to="/login" />} />        

      </Routes>
    </Router>
  );
};

export default App;