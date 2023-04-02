import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";

function App() {
  return (
   <Routes>
       <Route path="/" element={<Main />} />
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Registration />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="*" element={<div>404</div>} />
   </Routes>
  );
}

export default App;
