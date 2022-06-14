import Login from '@/presentation/pages/login/login'
import { Validation } from '@/presentation/protocols/validation'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

class ValidationSpy implements Validation {
  errorMessage:string
  input:object
  validate(fieldName: string, fieldValue: string): string {
      fieldName
      fieldValue
      return this.errorMessage
  }
}
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login validation={new ValidationSpy()} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router