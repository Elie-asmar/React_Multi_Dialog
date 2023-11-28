import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './Forms/Login';
import { DialogContainer } from './Containers/DialogContainer';


function App() {

  return (
    <Routes>
      <Route element={<DialogContainer />}>
        <Route path='/' element={<Login />} />
      </Route>
    </Routes >

  );
}

export default App;
