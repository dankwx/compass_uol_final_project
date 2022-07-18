import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from 'firebase-config';

export default function AppRouter() {
  const [loggedInUser, setloggedInUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setloggedInUser(user.email);
        console.log(loggedInUser);
        return true;
      } else {
        setloggedInUser(null);
        console.log('no user');
        return false;
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </Router>
  );
}
