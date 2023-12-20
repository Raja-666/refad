import React, { useState } from 'react'
import PatternLock from 'react-pattern-lock'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNewPatternMutation, useOldPatternMutation } from 'src/app/services/changepattern'

const ChangePattern = () => {
  const [sendOldPattern] = useOldPatternMutation()
  const [sendNewPattern] = useNewPatternMutation()
  const navigate = useNavigate();

  const [oldPattern, setOldPattern] = useState([])
  const [newPattern, setNewPattern] = useState([])
  const [confirmNewPattern, setConfirmPattern] = useState([])
  const [status, setStatus] = useState(false)

  const adminId = localStorage.getItem('AdminId')
  const handleOldPattern = (val) => {
    setOldPattern(val)
  }
  const handleNewPattern = (val) => {
    setNewPattern(val)
  }
  const handleConfirmPattern = (val) => {
    setConfirmPattern(val)
  }
  const handlenewPattern = async () => {
    try {
      if (newPattern.length !== confirmNewPattern.length) {
        return toast.error('Pattern is MisMatching')
      }
      if (newPattern.length < 4 || confirmNewPattern.length < 4) {
        return toast.error('please minimum select 4 dots')
      }
      for (let i = 0; i < newPattern.length; i++) {
        if (newPattern[i] !== confirmNewPattern[i]) {
          return toast.error('Pattern is Wrong')
        }
      }
      const response = await sendNewPattern({ newPattern, adminId })
      // console.log(response)
      if (response.error) {
        // console.log(response.error.data.message);

        toast.error(response.error.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
      } else {
        // console.log(response.data.status);

        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        })
        setNewPattern('')
        setConfirmPattern('')
        setOldPattern('')
        setStatus(!status)
        navigate('/')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleNewPasswordReset = () => {
    setNewPattern('')
    setConfirmPattern('')
  }
  const SubmitOldPattern = async () => {
    const response = await sendOldPattern({ oldPattern, adminId })

    if (response.error) {
      // console.log(response.error.data.message);

      toast.error(response.error.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
    } else {
      // console.log(response.data.status);

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      })
      setStatus(!status)
     
    }
    // localStorage.setItem("token", response.data.token)
    // localStorage.setItem("adminId", response.data.adminId
    // )
  }
  console.log(oldPattern, 'oldPattern')
  return (
    <div className="container py-5 ">
      <div className="row ">
        {status ? (
          <>
            <div className="col mt-3 ms-5 d-flex justify-content-center ">
              <div className=" border border-4 border-black p-4 rounded-2">
                <PatternLock
                  width={300}
                  pointSize={20}
                  size={3}
                  path={newPattern}
                  onChange={(val) => handleNewPattern(val)}
                  onFinish={() => {
                    // Handle pattern completion if needed
                  }}
                  className=" bg-danger ms-3 mt-3 text-center" // Add your custom class
                />
                <h6 className="text-center mt-3">Enter new pattern </h6>
              </div>
            </div>
            <div className="col d-flex justify-content-center ">
              <div className=" border p-4 border-4 border-black rounded-2">
                {' '}
                <PatternLock
                  width={300}
                  pointSize={18}
                  size={3}
                  path={confirmNewPattern}
                  onChange={(val) => handleConfirmPattern(val)}
                  onFinish={() => {
                    // Handle pattern completion if needed
                  }}
                  className=" bg-danger ms-3 mt-3 text-center" // Add your custom class
                />
                <h6 className=" ms-5 mt-3">Enter confirm pattern </h6>
              </div>
            </div>

            <div className="text-center mt-5 ">
              <button
                className="btn fw-bolder btn-outline-danger w-25"
                onClick={() => handleNewPasswordReset()}
              >
                reset
              </button>
              <button
                className="btn fw - bolder
             btn-outline-danger w-25"
                onClick={() => handlenewPattern()}
              >
                submit
              </button>
            </div>
          </>
        ) : (
          <div className="col mt-3 d-flex justify-content-center">
            <div className=" border border-4 border-black rounded-2 p-5">
              <h2 className=" text-center fw-bolder text-success">Enter old pattern </h2>
              <PatternLock
                width={300}
                pointSize={18}
                size={3}
                path={oldPattern}
                onChange={(val) => handleOldPattern(val)}
                onFinish={() => {
                  // Handle pattern completion if needed
                }}
                className=" bg-danger ms-3 mt-3 text-center" // Add your custom class
              />
              <div className=" mt-5 ms-5 ">
                <button
                  className="btn fw-bolder me-2 btn-lg btn-outline-danger text-dark "
                  onClick={() => setOldPattern('')}
                >
                  reset
                </button>
                <button
                  className="btn fw-bolder btn-lg ms-1 btn-outline-dark text-warning"
                  onClick={() => SubmitOldPattern()}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChangePattern
