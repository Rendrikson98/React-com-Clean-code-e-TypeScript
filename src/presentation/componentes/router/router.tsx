import Login from '@/presentation/pages/login/login'
import { Validation } from '@/presentation/protocols/validation'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

class ValidationStub implements Validation {
  errorMessage:string
  input:object
  validate(fieldName: string, fieldValue: string): string {
      return this.errorMessage
  }
}
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login validation={new ValidationStub()} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router