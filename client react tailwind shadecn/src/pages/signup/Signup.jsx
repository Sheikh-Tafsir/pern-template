import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import './Signup.css'
import ButtonLoading from '@/mycomponenrs/loading/Loading';
import { apiPath } from '@/utils/apiPath';
import {useUserContext} from '../../context/UserContext';

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signupStatus, setSignupStatus] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const loginUser = async() => {         
        setSignupStatus("please wait...");
        
        if(userName === "" || userName == null || userName === undefined){
            setSignupStatus("Name is empty");
        }
        else if(userEmail === "" || userEmail == null || userEmail === undefined){
            setRegStatus("Email is empty");
        }
        else if(password === "" || password == null || password === undefined){
            setSignupStatus("password is empty");
        }
        else if(confirmPassword === "" || confirmPassword == null || confirmPassword === undefined){
            setSignupStatus("confirm password is empty");
        }
        else if(password != confirmPassword){
            setSignupStatus("password and confirm password dont match");
        }

        // if(username==="sheikh" && password==="rub"){
        //      setLoginStatus("logging in");
        //      localStorage.setItem("localStorageUsername",username);
        //      localStorage.setItem("localStorageLoggedState",2);
        //      window.location.href = "/dashboardadmin";
        // }
        else{
            setButtonLoading(true);
            try{
                const apipath = `${apiPath}/user/singup`;
                const response = awaitAxios.post(apipath, 
                {
                    name:userName,
                    password:password
                })
                
                setSignupStatus(response.data.message);
                setButtonLoading(false);
                if(response.status == 200){
                    setUsername('');
                    setUserEmail('');
                    setPassword('');
                    setConfirmPassword('');

                    const userObj=response.data.user;
                    setUserInfo(userObj);
                    //console.log(userInfo);
                    localStorage.setItem('hackInShellUser', JSON.stringify(userObj));
                    localStorage.setItem('hackInShellAccessToken', response.data.token);
                }
                else{
                    //setSignupStatus("Wrong id or password");
                }
            }
            catch(error){
                //console.error(error);
                setButtonLoading(false);
                if(error.response.status == 401){
                    setSignupStatus(error.response.data.message);
                }
                else setSignupStatus(error.message);
            }
        };

    };

    useEffect(() => {
        //console.log(userInfo);
        if (userInfo && Object.keys(userInfo).length > 0) {
            navigate('/chatlist', { replace: true });
        }
    }, [userInfo]);


  return (
    <div className='signup'>
        <div className='signup_mainBox'>
            <h2>Signup User</h2>
            <Input type="text" placeholder="Insert Username" value={userName} onChange={(event) => {setUserName(event.target.value);}}/>
            <Input type="email" placeholder="Insert Email" value={userEmail} onChange={(event) => {setUserEmail(event.target.value);}}/>
            <Input type="password" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}/>
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => {setConfirmPassword(event.target.value);}}/>
            <p>{signupStatus}</p>
            <Button variant="outline" onClick={()=>loginUser()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Signup'
                }
            </Button>
            <Link to="/login" className="signup_signToLog">Already Have an account? log in </Link>
        </div>
    </div>
  )
}

export default Signup;