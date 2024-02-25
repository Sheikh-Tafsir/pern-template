import React, { useState, useEffect } from 'react'
import './ChatList.css'
import { useNavigate } from 'react-router-dom';
import {useUserContext} from '../../context/UserContext';
import Chat from '../chat/Chat';

const ChatList = ({ onChatItemClick }) => {
    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    const {userInfo, setUserInfo} = useUserContext();
    const chatListData = [
        { id: 1, name: 'John Doe', image: 'john.jpg' },
        { id: 2, name: 'Jane Smith', image: 'jane.jpg' },
        { id: 8, name: 'Salina', image: 'alice.jpg' },
      ];
    
      const handleChatItemClick = (receiverUser) => {
        navigate('/chat', {state: {receiverUser} });
      };
      useEffect(()=>{
        setPageLoading(false);
        // console.log(userInfo);
        // console.log(localStorage.getItem('hackInShellAccessToken'));
        // console.log(localStorage.getItem('hackInShellUser'));
      }, [userInfo])
    
      // if(pageLoading){
      //   return (<ButtonLoading />)
      // }
      return (
        <>
          {/* <NavigationBar/> */}
          <div className="chatlist">
            <div className="chatlist_mainBox">
              <h2>Chats</h2>
              {chatListData.map((chatItem) => (
                <div
                  key={chatItem.id}
                  className="chatlist-item"
                  // onClick={() => handleChatItemClick(chatItem)}
                  onClick={() => onChatItemClick(chatItem)}
                >
                  <img src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`} alt={chatItem.name} />
                  <p>{chatItem.name}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )
}

export default ChatList