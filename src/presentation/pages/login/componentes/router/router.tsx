import Login from '@/presentation/pages/login/login'
import '@/presentation/styles/colors.scss'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router