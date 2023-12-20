
import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEye, IoEyeOffSharp } from 'react-icons/io5'
import { BiRightArrowAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PatternLock from 'react-pattern-lock'
// import { useHandleAdminLoginMutation } from './loginApi'
import { useAdminloginDataMutation } from 'src/app/services/adminSlice'

import { toast } from 'react-toastify'

const schema = yup.object().shape({
  email: yup.string().required('Email is required!').email('Invalid email'),
  password: yup.string().required('Password is required!'),
})

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [pattern, setPattern] = useState([])
  // Naviagte
  const navigate = useNavigate()
  const [handleAdminLogin] = useAdminloginDataMutation()
  // console.log(pattern);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const handlePatternComplete = (value) => {
    // Do something with the completed pattern (e.g., store it in state)
    setPattern(value)
  }
  const adminLogin = async (data) => {
    try {
      let loginData = {
        email: data.email,
        password: data.password,
        pattern,
      }
      const response = await handleAdminLogin(loginData)
      console.log(response)
      if (response.error) {
        return toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      let id = response.data.loginAdminData._id
      let authVerify = response.data.loginAdminData.authVerify

      let token = response.data.token
      console.log(token)

      localStorage.setItem('AdminId', id)
      localStorage.setItem('token', token)

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      if (!authVerify) {
        navigate('/two')
        return
      }
      navigate('/dashboard')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="bg-dark min-vh-100 d-flex flex-col align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCardGroup>
              <CCard className="p-5">
                <CCardBody>
                  <form onSubmit={handleSubmit(adminLogin)}>
                    <h2 className="text-success">Admin-Login</h2>
                    <p className=" text-success input-group-text">Sign In to your account</p>
                    <div className="form-row  ">
                      <div className="form-group col">
                        <label className="fs-5">Email</label>
                        <input
                          name="email"
                          type="text"
                          placeholder="you@mail.com"
                          {...register('email')}
                          className={`form-control  mb-3 ${errors.email ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <label className=" fs-5">Password</label>

                        <div className="input-group">
                          <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            {...register('password')}
                            placeholder="Password"
                          />
                          <span
                            className="input-group-text rounded-end-4 bg-warning fs-4"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <IoEye /> : <IoEyeOffSharp />}
                          </span>
                          <div className="invalid-feedback">{errors?.password?.message}</div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group d-grid mt-4">
                      <button type="submit" className="btn btn-outline-success mr-1 fs-4">
                        Login <BiRightArrowAlt />
                      </button>

                      <div className="mt-4">
                        <span
                          style={{ cursor: 'pointer' }}
                          className=" text-decoration-underline h5 text-info"
                          onClick={() => navigate('/forgetPassword')}
                        >
                          ForgotPassword
                        </span>
                        <span
                          onClick={() => navigate('/forgetPattern')}
                          style={{ cursor: 'pointer' }}
                          className=" ms-5 text-decoration-underline h5 text-info"
                        >
                          ForgotPattern
                        </span>
                      </div>
                    </div>
                  </form>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-info py-5 fs-1 p-5" style={{ width: '70%' }}>
                <CCardBody className="text-center text-white">
                  <label className="fs-5 text-white ">Unlock your Pattern Lock</label>
                  <PatternLock
                    width={230}
                    pointSize={18}
                    size={3}
                    path={pattern}
                    onChange={(val) => handlePatternComplete(val)}
                    onFinish={() => {
                      // Handle pattern completion if needed
                    }}
                    className="bg-info ms-5 mt-4 text-center" // Add your custom class
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPattern('')
                    }}
                    className="btn btn-primary mt-4 fs-5"
                  >
                    {' '}
                    Reset
                  </button>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
