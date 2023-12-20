import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
// import otpImg from '../../images/download.jpeg'
import useClipboard from 'react-use-clipboard'
import { FaRegCopy } from 'react-icons/fa'
import img from '../../../../src/assets/images/img/6.gif'
import OTPInput, { ResendOTP } from 'otp-input-react'
import {
  useDisableTwoFactorVerifyMutation,
  useGetTwoFactorAuthenticationMutation,
  useTwoFactorVerifyMutation,
} from '../../../app/services/twoFactorApi'
import { useNavigate } from 'react-router-dom'
const schema = Yup.object().shape({
  otp: Yup.string()
    .required('otp is required')
    .min(6, 'Enter Six Digits Number')
    .max(6, 'Invalid OTP')
    .trim(),
})

const TwoFactorAuth = () => {
  const navigate = useNavigate()
  const adminId = localStorage.getItem('AdminId')
  const forgetPassword = localStorage.getItem('forgetPassword')
  const forgetPattern = localStorage.getItem('forgetPattern')

  const [authCode, setAuthCode] = useState('')
  const [authQrCode, setAuthQrCode] = useState('')
  const [isCopied, setCopied] = useClipboard(authCode)

  const [getTwoFactorData] = useGetTwoFactorAuthenticationMutation()
  const [verifyUserAuthCode] = useTwoFactorVerifyMutation()
  const [disableTwoFactor] = useDisableTwoFactorVerifyMutation()

  const [OTP, setOTP] = useState('')
  const [authVerifyStatus, setAuthVerifyStatus] = useState('')

  useEffect(() => {
    const handleTwoFactorAuth = async () => {
      try {
        const response = await getTwoFactorData({ id: adminId })

        if (response.error) {
          return toast.error(response.error.data.message, {
            position: toast.POSITION.TOP_CENTER,
          })
        }
        setAuthVerifyStatus(response.data.twoFactorAuthData.authVerify)
        setAuthCode(response.data.authCode)
        setAuthQrCode(response.data.qrCodeImgSrc)
        console.log(response)
      } catch (error) {
        console.log(error.message)
      }
    }
    handleTwoFactorAuth()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const disableTwoFactorAuth = async () => {
    try {
      const response = await disableTwoFactor({ id: adminId })
      if (response.error) {
        return toast.error('Something Went Wrong', {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const copyText = () => {
    setCopied()
    toast.info('Text Copied', {
      position: toast.POSITION.TOP_CENTER,
    })
  }

  // verify Fuction
  const verifyAuthCode = async (e) => {
    e.preventDefault()
    try {
      const response = await verifyUserAuthCode({ id: adminId, token: OTP })
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      if (forgetPassword) {
        localStorage.removeItem('forgetPassword')
        navigate('/verifyPassword')
        return
      }

      if (forgetPattern) {
        localStorage.removeItem('forgetPattern')
        navigate('/setpattern')
        return
      }

      navigate('/dashboard')
    } catch (error) {}
  }

  return (
    <>
      <div
        className="p-4 twoFactor-Bg"
        style={{ minHeight: '100vh', backgroundColor: 'lightpink' }}
      >
        <h1 className="text-center mb-5">Security</h1>
        <div className="row">
          {authVerifyStatus ? (
            <div className="col-lg-6">
              <p className="display-4 fw-bold">
                Google Authentication <span style={{ color: '#9ADE7B' }}>Verified</span>
              </p>
              <button
                type="button"
                onClick={disableTwoFactorAuth}
                className=" mt-4 btn btn-warning"
              >
                Disable
              </button>
            </div>
          ) : (
            <div className="col-lg-7">
              <form onSubmit={verifyAuthCode}>
                <div className="mb-5">
                  <p className="fw-bold">
                    Copy This Code Generate Authentication{' '}
                    <span role="button">
                      {' '}
                      <FaRegCopy onClick={copyText} />
                    </span>
                  </p>
                  <p>{authCode}</p>
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
                  <div className="d-grid my-3 ">
                    <button className="btn btn-dark " type="submit">
                      Verify
                    </button>
                  </div>
                </div>
              </form>
              <ToastContainer />
              <p>Scan Qr Code </p>
              <img src={authQrCode} alt="" />
            </div>
          )}
          <div
            style={{ borderRadius: '50%', border: '10px', borderBlock: '10px' }}
            className="col-md-5  rounded-pill"
          >
            <img
              src={img}
              style={{ width: '800px', border: '20px', borderBlock: '2px', borderRadius: '100%' }}
              className="img-fluid"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TwoFactorAuth
