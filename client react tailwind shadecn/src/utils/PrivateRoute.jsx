import { Outlet, Navigate } from 'react-router-dom'
import { checkLogin } from './checkLogin'
import NavigationBar from '@/pages/landingPage/navbar/NavigationBar';
import CopyRight from '@/pages/landingPage/copyright/CopyRight';

const PrivateRoute = () => {
    let loggedIn = checkLogin();
    return(
        !loggedIn ? 
        <>
          <NavigationBar />
          <Outlet/> 
          {/* <CopyRight/> */}
        </>
        : 
        <Navigate to="/login"/>
    )
}

export default PrivateRoute