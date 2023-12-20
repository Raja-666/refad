import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import otpImg from '../../../assets/images/Enter OTP-pana.png'
import OTPInput from 'otp-input-react'
import { useLoginTwoFactorVerifyMutation } from 'src/app/services/forgotpassword'
// import { useLoginTwoFactorVerifyMutation } from '../login/twoFactor/twoFactorApi'
// schema OTP validation

const PasswordTwoFactorVerify = () => {
  const navigate = useNavigate()
  // localStorage ID
  const adminId = localStorage.getItem('adminId')
  // RTK
  const [loginTwoFactorVerify] = useLoginTwoFactorVerifyMutation()

  const [OTP, setOTP] = useState('')

  // verify Fuction
  const verifyAuthCode = async (e) => {
    e.preventDefault()
    try {
      const response = await loginTwoFactorVerify({ id: adminId, token: OTP })
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      navigate('/setNewPassword')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
      <div className="p-5 twoFactor-Bg" style={{ minHeight: '100vh' }}>
        <h1 className="text-center mb-5">Verify Page</h1>
        <div className="row">
          <div className="col-lg-5">
            <form onSubmit={verifyAuthCode}>
              <div className="mb-5">
                <div>
                  <>
                    <h5 className="mt-5 mb-3">Enter Your Authetication Key</h5>
                    <OTPInput
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                    />
                  </>
                </div>
                <button className="btn mt-4 btn-dark " type="submit">
                  Verify
                </button>
              </div>
            </form>
          </div>

          <div className="col-lg-7">{/* <img src={otpImg} className="img-fluid" alt="" /> */}</div>
        </div>
      </div>
    </>
  )
}

export default PasswordTwoFactorVerify
