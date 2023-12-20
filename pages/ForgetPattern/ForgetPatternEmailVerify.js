import React from 'react'
// import email from '../../../assets/images/email2.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
// import { useForgetPasswordVerifymailMutation } from '../forgetPassword/forgetPasswordApi'
import { toast } from 'react-toastify'
import { useForgetPasswordVerifymailMutation } from 'src/app/services/forgotpassword'
// import img from '../../'

import img from '../../../../src/assets/images/img/3.gif'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, 'enter valid email')
    .trim(),
})

const ForgetPatternEmailVerify = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  // RTK Query
  const [verifyEmail] = useForgetPasswordVerifymailMutation()

  const handleVerifyEmail = async (data) => {
    try {
      const response = await verifyEmail(data)
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      localStorage.setItem('AdminId', response.data.adminData._id)
      const twoFactorStatus = response.data.adminData.authVerify
      if (!twoFactorStatus) {
        localStorage.setItem('forgetPattern', true)
        navigate('/two')
        return
      }
      navigate('/2fa')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className="p-4 twoFactor-Bg" style={{ minHeight: '100vh' }}>
        <h1 className=" ms-5  text-success fw-bold mb-5">Security</h1>
        <div className="row">
          <div className="col-lg-5">
            <form onSubmit={handleSubmit(handleVerifyEmail)}>
              <div className="mb-5">
                <h1>Enter Your Email</h1>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control  ${errors?.email ? 'is-invalid' : ''}`}
                    name="email"
                    {...register('email')}
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                  <div className="invalid-feedback ">
                    <span>{errors?.email?.message}</span>
                  </div>
                </div>

                <div className="d-grid my-3 ">
                  <button className="btn btn-dark" type="submit">
                    Verify
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-6">
            <img src={img} style={{ borderRadius: '500px' }} className="img-fluid rounded" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPatternEmailVerify
