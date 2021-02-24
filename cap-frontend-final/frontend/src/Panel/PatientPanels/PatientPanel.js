import React, { useState } from 'react'
import { Button } from '../Button'
import { Link } from 'react-router-dom'
import '../Navbar.css'
import Dropdown from './Dropdown'
import { FaBars, FaTimes } from 'react-icons/fa'
import { BsCaretDown } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'

function PatientPanel() {
  const [click, setClick] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(true)
    }
  }

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false)
    } else {
      setDropdown(false)
    }
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <Link
            to='/patient/dashboard'
            className='navbar-logo'
            onClick={closeMobileMenu}>
            DASHBOARD
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                to='/patient/dashboard'
                className='nav-links'
                onClick={closeMobileMenu}>
                Basic Details
              </Link>
            </li>
            <li
              className='nav-item'
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
              <Link
                to='/patient/dashboard/graph'
                className='nav-links'
                onClick={closeMobileMenu}>
                Medical Data <BsCaretDown />
              </Link>
              {dropdown && <Dropdown />}
            </li>
            <li className='nav-item'>
              <Link
                to='/products'
                className='nav-links'
                onClick={closeMobileMenu}>
                Products
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contact-us'
                className='nav-links'
                onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
          </ul>
          <Button />
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default PatientPanel
