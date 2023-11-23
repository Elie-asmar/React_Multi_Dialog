import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { SystemFileContainer } from './SystemFileContainer';


export function SystemFileRoutes() {


    return (
        <Routes>
            <Route index element={<SystemFileContainer />} />
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    )
}
