import React, { useState } from 'react'
import './styles.css'
//import Home from "../home"
import { Link } from 'react-router-dom'
import { signup } from '../CallingApi/patientapi'
import Navbar from '../Landing Page/Navbar'
//import Footer from '../Landing Page/Footer'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const RegisterDoctor = (props) => {
  // console.log(props);
  const [values, setValues] = useState({
    Name: '',
    Email: '',
    password: '',
    Enter_password_again: '',
    PhoneNumber: '',
    Degree: '',
    specialisation: '',
    type_work: '',
    address: '',
    error: '',
    message: '',
  })

  const {
    Name,
    Email,
    password,
    Enter_password_again,
    PhoneNumber,
    Degree,
    specialisation,
    type_work,
    address,
    error,
    message,
  } = values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    signup(
      {
        doctor_name: Name,
        doctor_email: Email,
        password: password,
        passwordCheck: Enter_password_again,
        doctor_phone_no: PhoneNumber,
        degree: Degree,
        specialisation: specialisation,
        type_work,
        address,
      },
      props.location.pathname
    )
      .then((data) => {
        if (data.msg) {
          setValues({ ...values, error: data.msg, message: '' })
        } else {
          setValues({ ...values, error: '', message: data.message })
        }
      })
      .catch((err) => console.log(err.message))
  }

  //
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
          <div>Doctor Registration</div>
        </div>
        <div className='form'>
          <div className='inputfield'>
            <label>Name</label>
            <input
              type='text'
              name='Name'
              value={Name}
              onChange={onChange}
              className='input'
            />
          </div>
          <div className='inputfield'>
            <label>Email</label>
            <input
              type='email'
              name='Email'
              className='input'
              value={Email}
              onChange={onChange}
            />
          </div>
          <div className='inputfield'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              className='input'
              value={password}
              onChange={onChange}
            />
          </div>
          <div className='inputfield'>
            <label>Confirm Password</label>
            <input
              type='password'
              name='Enter_password_again'
              className='input'
              value={Enter_password_again}
              onChange={onChange}
            />
          </div>
          <div className='inputfield'>
            <label>Phone Number</label>
            <input
              type='number'
              name='PhoneNumber'
              className='input'
              value={PhoneNumber}
              onChange={onChange}
            />
          </div>
          <div className='inputfield'>
            <label>Degree</label>
            <input
              name='Degree'
              className='input'
              value={Degree}
              onChange={onChange}
            />
          </div>
          <div className='inputfield'>
            <label>Specialization</label>
            <input
              name='specialisation'
              className='input'
              value={specialisation}
              onChange={onChange}
            />
          </div>
          <div className='inputfield'>
            <label>Type of Work</label>
            <select
              name='type_work'
              value={type_work}
              onChange={onChange}
              className='input'>
              <option value='clinic'>Clinic</option>
              <option value='hospital'>Hospital</option>
            </select>
          </div>
          <div className='inputfield'>
            <label>Address</label>
            <textarea
              name='address'
              className='textarea'
              value={address}
              onChange={onChange}
            />
          </div>
          {error ? <p className='error_message'>{error}</p> : ''}
          {message ? <p className='message'>{message}</p> : ''}
          <div className='inputfield'>
            <button onClick={onSubmit} className='btn'>
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

export default RegisterDoctor
