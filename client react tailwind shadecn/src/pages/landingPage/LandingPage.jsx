import React from 'react'
import Heromain from './heromain/Heromain';
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';
import CopyRight from '@/mycomponenrs/copyright/CopyRight';
const LandingPage = () => {
  return (
    <>
        <NavigationBar/>
        <Heromain/>
        <CopyRight />
    </>
  )
}

export default LandingPage