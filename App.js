import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import Helo from './components/header/Helo'
import { ToastContainer } from 'react-toastify'
import TwoFactorAuth from './views/pages/TwoFactorAuth/TwoFactorAuth'
import Changepassword from './views/pages/changepassword/ChangePassword'
import Kyc from './views/pages/kyc/Kyc'
import ChangePattern from './views/pages/changePattern/ChangePattern'
import ForgetPatternAuthCodeVerify from './views/pages/ForgetPattern/ForgetPatternAuth'
import ForgetPatternEmailVerify from './views/pages/ForgetPattern/ForgetPatternEmailVerify'

import SetNewPattern from './views/pages/SetNewPattern/SetNewPattern'
import Userlist from './views/pages/userlist/Userlist'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

const ForgetPassword = React.lazy(() => import('./views/pages/password/ForgetPassword'))

const VerifyPassword = React.lazy(() => import('./views/pages/password/VerifedForgetPassword'))

const SetNewPassword = React.lazy(() => import('./views/pages/password/SetNewPassword'))

const VerifityCollection = React.lazy(() => import('./views/pages/collections/verifityCollection'))


const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
            <Route path="/helo" name="Home" element={<Helo />} />
            <Route path="/two" name="Home" element={<TwoFactorAuth />} />
            {/* <Route path="/changepassword" name="Home" element={<Changepassword />} /> */}
            {/* <Route path="/kyc" name="Home" element={<Kyc />} /> */}
            <Route path="/changepattern" name="Home" element={<ChangePattern />} />
            <Route path="/2fa" name="Home" element={<ForgetPatternAuthCodeVerify />} />
            <Route path="/forgetPattern" name="Home" element={<ForgetPatternEmailVerify />} />

            <Route path="/setpattern" name="Home" element={<SetNewPattern />} />
            {/* new changes */}

            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/verifyPassword" element={<VerifyPassword />} />

            <Route path="/userlist" element={<Userlist />} />
            <Route path="/userKyc/:id" element={<Kyc />} />

            <Route path="/setNewPassword" element={<SetNewPassword />} />


            
            <Route path="/collection" element={<VerifityCollection />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    )
  }
}

export default App
