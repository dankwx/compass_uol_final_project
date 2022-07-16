import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function AppRouter() {
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
