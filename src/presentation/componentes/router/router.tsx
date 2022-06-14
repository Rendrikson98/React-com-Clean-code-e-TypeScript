import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/teste';
import { Authentication, AuthenticationParams } from '@/domain/usecases';
import Login from '@/presentation/pages/login/login'
import { Validation } from '@/presentation/protocols/validation'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

class AuthenticationSpy implements Authentication{
  account = mockAccountModel();
  params: AuthenticationParams
  async auth(params: AuthenticationParams): Promise<AccountModel> {
      this.params = params
      return Promise.resolve(this.account)
  }
}

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
        <Route path='/login' element={<Login validation={new ValidationStub()} authentication ={new AuthenticationSpy()} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router