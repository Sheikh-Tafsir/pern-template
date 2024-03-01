import { Outlet, Navigate } from 'react-router-dom'
import { checkLogin } from './checkLogin'
import CopyRight from '@/pages/landingPage/copyright/CopyRight';
import NavigationBar from '@/mycomponenrs/navbar/NavigationBar';

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