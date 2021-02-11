import React from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from './Landing Page/Navbar'
import { API } from './Backend'
import Footer from './Landing Page/Footer'
import HeroSection from './Landing Page/HeroSection'
import { homeObjOne, homeObjTwo } from './Data'

function Home() {
  console.log('API IS', API)
  return (
    <>
      <Navbar />
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjTwo} />
      <Footer />
    </>
  )
}

export default withRouter(Home)
