import React from 'react'
// import password from '../../../assets/images/password2.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
// import { useSetNewPasswordMutation } from './forgetPasswordApi'
import { toast } from 'react-toastify'
import { useSetNewPasswordMutation } from 'src/app/services/forgotpassword'

const schema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .matches(/[A-Z]/, 'Please Give One UpperCase Letter')
    .matches(/[0-9]/, 'Please One Number')
    .matches(/[-!$%^&*()_+|~=`{}[\]:/;<>?,.@#]/, 'Please Give Special Character.. like @#$')
    .trim()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords does not match')
    .required('Confirm Password is required')
    .trim(),
})

const SetNewPassword = () => {
  const navigate = useNavigate()
  // localStroage ID
  const adminId = localStorage.getItem('AdminId')

  // RTK

  const [setNewPassword] = useSetNewPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })

  const handleSetNewPassword = async (data) => {
    try {
      const response = await setNewPassword({ password: data.password, id: adminId })
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      // navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <div className="p-4 twoFactor-Bg" style={{ minHeight: '100vh' }}>
        <div className="my-5">
          <div className="row">
            <div className="col-lg-6">
              <form onSubmit={handleSubmit(handleSetNewPassword)}>
                <div className="mb-5">
                  <h1>Set Your Password</h1>
                  <div className="my-3">
                    <>
                      <input
                        className={`form-control  ${errors?.password ? 'is-invalid' : ''}`}
                        type="password"
                        name="password"
                        {...register('password')}
                        placeholder="Enter Your Password"
                      />
                      <div className="invalid-feedback ">
                        <span style={{ margin: '13px' }}>{errors?.password?.message}</span>
                      </div>
                    </>

                    <div className="mt-3">
                      <input
                        className={`form-control  ${errors?.confirmPassword ? 'is-invalid' : ''}`}
                        type="password"
                        {...register('confirmPassword')}
                        name="confirmPassword"
                        placeholder="Enter Your Confirm Password"
                      />
                      <div className="invalid-feedback ">
                        <span style={{ margin: '13px' }}>{errors?.confirmPassword?.message}</span>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid my-3 ">
                    <button className="btn btn-dark " type="submit">
                      Verify
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-6">
              <img className="img-fluid rounded" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SetNewPassword
