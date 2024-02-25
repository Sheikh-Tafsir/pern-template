import React, { useState, useEffect} from 'react';
import ChatList from '../chatlist/ChatList';
import Chat from './Chat';

const Chats = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleChatItemClick = (receiverUser) => {
        //console.log(receiverUser);
        setSelectedUser(receiverUser);
    };
  
    return (
      <div className="chats">
        <div className='chats_mainBox'>
            <ChatList onChatItemClick={handleChatItemClick} />
            <Chat receiverUser={selectedUser} />
        </div>
        
      </div>
    );
}

export default Chats