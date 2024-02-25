import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';

import './Login.css'
import ButtonLoading from '@/mycomponenrs/loading/Loading';
import {useUserContext} from '../../context/UserContext';
import { apiPath } from '@/utils/apiPath';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const loginUser = async () => {         
        
        if(username === "" || username == null || username === undefined){
            setLoginStatus("Name is empty");
        }
        else if(password === "" || password == null || password === undefined){
            setLoginStatus("password is empty");
        }
        else{
            setButtonLoading(true);
            try{
                const apipath = `${apiPath}/user/login`;
                const response = await axios.post(apipath, 
                {
                    name:username,
                    password:password
                })
                //console.log(response);
                
                setLoginStatus(response.data.message);
                setButtonLoading(false);
                if(response.status == 200){
                    setUsername('');
                    setPassword('');

                    localStorage.setItem('hackInShellUser', JSON.stringify(response.data.user));
                    localStorage.setItem('hackInShellAccessToken', response.data.token);
                    
                    const userObj=response.data.user;
                    setUserInfo(userObj);
                    //navigate('/chatlist');
                }
                else{
                    //
                }
            }
            catch(error){
                //console.log(error.response);
                setButtonLoading(false);
                if(error.response.status == 401){
                    setLoginStatus(error.response.data.message);
                }
                else setLoginStatus(error.message);
            };
        }
    };
    
    useEffect(() => {
        //console.log(userInfo);
        if (userInfo && Object.keys(userInfo).length > 0) {
            navigate('/chats', { replace: true });
        }
    }, [userInfo]);


  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h2>Login User</h2>
            <Input type="text" placeholder="Insert Username" value={username} onChange={(event) => {setUsername(event.target.value);}}/>
            <Input type="password" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}/>
            <p>{loginStatus}</p>
            <Button variant="outline" onClick={()=>loginUser()}>
                { buttonLoading? 
                    <ButtonLoading/>:
                    'Login'
                }
            </Button>
            <Link to="/signup" className="login_logToSign">Don't Have an account? SignUp </Link>
        </div>
    </div>
  )
}

export default Login