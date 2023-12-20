import React from 'react'
// import email from '../../../assets/images/email2.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForgetPasswordVerifymailMutation } from 'src/app/services/forgotpassword'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .matches(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/, 'enter valid email')
    .trim(),
})

const ForgetPassword = () => {
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
      localStorage.setItem('adminId', response.data.adminData._id)
      const twoFactorStatus = response.data.adminData.authVerify
      if (!twoFactorStatus) {
        localStorage.setItem('forgetPassword', true)
        navigate('/two')
        return
      }
      navigate('/verifyPassword')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className="p-4 twoFactor-Bg d-flex-row align-items-lg-center mt-5" style={{ minHeight: '100vh' }}>
        <h1 className="row text-center text-bg-info justify-content-center mb-5 ms-1">Email Verification </h1>
        <div className="row text-center text-bg-info justify-content-center">
          <div className="col-lg-8 ms-5 mt-4">
            <form onSubmit={handleSubmit(handleVerifyEmail)}>
              <div className="mb-5 row text-center text-bg-info justify-content-center">
                <h1>Enter Your Email</h1>
                <div className="mb-3 row text-center text-bg-info justify-content-center">
                  <div className="card bg-transparent">
                    <div className="card-body ms-1 w-100">
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
                    <div className="d-grid my-3 px-3 ms-3">
                      <button className="btn btn-warning w-25 fs-5 ms-5" type="submit">
                        Verify
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-6">
            {/* <img src={email} className="img-fluid rounded" alt="" /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
