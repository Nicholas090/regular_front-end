import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return (
   <Routes>
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Registration />} />
     <Route path="*" element={<div>404</div>} />
   </Routes>
  );
}

export default App;
