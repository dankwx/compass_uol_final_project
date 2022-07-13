import Home from 'pages/Home';
import Login from 'pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </Router>
  );
}
