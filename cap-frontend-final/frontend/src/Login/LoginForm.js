import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './styles.css'
import { signin, authenticate, isAutheticated } from '../CallingApi/patientapi'
import { signout } from '../CallingApi/patientapi'
import Navbar from '../Landing Page/Navbar'
import { Button } from '../Landing Page/Button'
//import Footer from '../Landing Page/Footer'
function LoginForm(props) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    success: '',
    performRedirect: false,
  })

  const { user } = isAutheticated()
  console.log('From is auth ', user)

  const onchange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const { email, password, error, success, performRedirect } = values
  const onsubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      signin({ email, password }, props.location.pathname)
        .then((data) => {
          console.log(data)
          if (data.msg) {
            setValues({ ...values, error: data.msg })
          } else {
            authenticate(data, () => {
              setValues({ ...values, performRedirect: true })
            })
          }
        })
        .catch((err) => console.log(err.message))
    } else {
      alert('Enter all details')
    }
  }

  const performRedirects = () => {
    if (performRedirect) {
      if (user.patient_name) {
        return <Redirect to='/patient/dashboard' />
      } else if (user.org_name) {
        return <Redirect to='/org/dashboard' />
      } else if (user.doctor_name) {
        return <Redirect to='/doctor/dashboard' />
      }
    }
  }
  return (
    <div>
      <Navbar />
      <div className='wrapper'>
        <div className='back'>
          <Link to='/'>
            {' '}
            <div className='inputfield'>
              <p>Back to Home</p>
            </div>{' '}
          </Link>
          <div className='title'>Login here</div>
        </div>
        <div className='form'>
          <div className='inputfield'>
            <label>Email</label>
            <input
              required
              name='email'
              onChange={onchange}
              value={email}
              className='input'
              type='email'
            />
          </div>
          <div className='inputfield'>
            <label>Password</label>
            <input
              name='password'
              onChange={onchange}
              value={password}
              type='password'
              className='input'
            />
          </div>
          <div className='inputfield'>
            <button onClick={onsubmit} className='btn'>
              Submit
            </button>
          </div>
          {error ? <div className='error_message'>{error}</div> : ''}
          {success ? <div className='message'>{success}</div> : ''}
          <Link to='/register'>
            {' '}
            <div className='inputfield'>
              <p>Not Registered? Click Here</p>
            </div>{' '}
          </Link>

          {performRedirects()}
        </div>
      </div>
    </div>
  )
}

export default LoginForm
