import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import PatientTable from './components/PatientTable';
import Login from './components/Login';


// Custom hook untuk mengatur title halaman
const useTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const HomePageWithTitle = () => {
  useTitle('Display Antrian');
  return <HomePage />;
};

const PatientTableWithTitle = () => {
  useTitle('Halaman Input');
  return <PatientTable />;
};

function App (){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageWithTitle />} />
        <Route path="/input" element={<PrivateRoute><PatientTableWithTitle /></PrivateRoute>} />
        <Route path="/auth" element={<Login/>} />
      </Routes>
    </Router>
  );
}


function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth" />;
}


export default App;
