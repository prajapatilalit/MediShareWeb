import React, { useState } from 'react'
import './styles.css'
//import Home from '../home'
import { Link } from 'react-router-dom'
import { signup } from '../CallingApi/patientapi'
import Navbar from '../Landing Page/Navbar'
//import Footer from '../Landing Page/Footer'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

function RegisterOrganisation(props) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    phone_no: '',
    regestration_no: '',
    role: '',
    org_head_addr: '',
    reddrsl_no: '',
    error: '',
    message: '',
  })
  const {
    name,
    email,
    password,
    passwordCheck,
    phone_no,
    regestration_no,
    role,
    org_head_addr,
    reddrsl_no,
    error,
    message,
  } = values

  const onsubmit = () => {
    signup(
      {
        org_name: name,
        org_email: email,
        password,
        passwordCheck,
        org_phone_no: phone_no,
        reg_no: regestration_no,
        reg_role: role,
        org_head_addr: org_head_addr,
        reddrsl_no,
      },
      props.location.pathname
    )
      .then((data) => {
        if (data.msg) {
          setValues({ ...values, error: data.msg, message: '' })
          alert(error)
        } else {
          setValues({ ...values, error: '', message: data.message })
          alert(message)
        }
      })
      .catch((err) => console.log(err.message))
  }

  const onchange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <Navbar />
      <div className='wrapper'>
        <div className='back'>
          <Link to='/Register'>
            {' '}
            <div className='inputfield back-button'>
              <p>{<ArrowBackIcon />}</p>
              <p>Back to Register Dashboard</p>
            </div>{' '}
          </Link>
        </div>
        <div className='title'>
          <div>Organization Registration</div>
        </div>

        <div className='form'>
          <div className='inputfield'>
            <label>Organization Name</label>
            <input
              name='name'
              value={name}
              onChange={onchange}
              className='input'
            />
          </div>
          <div className='inputfield'>
            <label>Organization Email</label>
            <input
              name='email'
              type='email'
              value={email}
              onChange={onchange}
              className='input'
            />
          </div>
          <div className='inputfield'>
            <label>Password</label>
            <input
              className='input'
              type='password'
              name='password'
              value={password}
              onChange={onchange}
            />
          </div>
          <div className='inputfield'>
            <label>Confirm Password</label>
            <input
              type='password'
              className='input'
              name='passwordCheck'
              value={passwordCheck}
              onChange={onchange}
            />
          </div>
          <div className='inputfield'>
            <label>Phone Number</label>
            <input
              type='number'
              className='input'
              name='phone_no'
              value={phone_no}
              onChange={onchange}
            />
          </div>
          <div className='inputfield'>
            <label>Registration Number</label>
            <input
              className='input'
              name='regestration_no'
              value={regestration_no}
              onChange={onchange}
            />
          </div>
          <div className='inputfield'>
            <label>Role in Organization</label>
            <input
              className='input'
              name='role'
              value={role}
              onChange={onchange}
            />
          </div>
          <div className='inputfield'>
            <label>Head Office Address</label>
            <textarea
              name='org_head_addr'
              className='textarea'
              value={org_head_addr}
              onChange={onchange}
            />
          </div>
          <div className='inputfield'>
            <label>Company Redressal Number</label>
            <input
              className='input'
              name='reddrsl_no'
              value={reddrsl_no}
              onChange={onchange}
            />
          </div>
          {error ? <p className='error_message'>{error}</p> : ''}
          {message ? <p className='message'>{message}</p> : ''}
          <div className='inputfield'>
            <button onClick={onsubmit} className='btn'>
              Submit
            </button>
          </div>

          <Link to='/users/login'>
            {' '}
            <div className='inputfield'>
              <p>Already Registered? Login</p>
            </div>{' '}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterOrganisation
