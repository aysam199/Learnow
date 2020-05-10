import React, { useEffect, useState } from 'react';
import './GroupChat.css';
import io from 'socket.io-client';
import axiosPost from '../../utils/axiosPost';
import UsersList from '../UsersList/UsersList';
import MessagesList from '../MessagesList/MessagesList';

function GroupChat({ group, setGroup, user }) {
  let apiUrl = 'http://localhost:5000';
  if (process.env.NODE_ENV === 'production') {
    apiUrl = 'https://learnow-be.herokuapp.com';
  }
  const id = user.sub.split('|')[1];
  const [socket, setSocket] = useState(io.connect(apiUrl));
  const [msgsArray, setMsgsArray] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    socket.emit('user connected', user.nickname);
  }, []);

  const emitMsg = msg => {
    socket.emit('chat message', {
      userName: user.nickname,
      picture: user.picture,
      message: msg,
    });

    axiosPost('/messages/add', {
      userId: id,
      groupId: group.id,
      userName: user.nickname,
      message: msg,
    })
      .then(console.log)
      .catch(console.log);
  };

  const sendMsg = e => {
    e.preventDefault();
    let msg = e.target.msg.value.trim();
    e.target.msg.value = '';
    if (!msg.length) return;
    else {
      emitMsg(msg);
    }
  };


  return (
    <div>
      <div className='groupchat-nav'>
        <span className='back-to-groups' onClick={() => setGroup(null)}>
          ⟵ Back to groups
        </span>
        <div className='groupname-container'>
          <span className='chat-groupname' onClick={() => setGroup(null)}>
            {group.name}
          </span>
        </div>
      </div>
      <div className='chat-container'>
        <div className='users-and-msgs-container'>
          <UsersList connectedUsers={connectedUsers} setConnectedUsers={setConnectedUsers} socket={socket} groupId={group.id} />

          <div className='message-box'>
            <MessagesList
              groupId={group.id}
              msgsArray={msgsArray}
              setMsgsArray={setMsgsArray}
              socket={socket}
            />
            <form className='chat-from' onSubmit={sendMsg}>
              <label className='input-label' htmlFor='msg'>
                <input type='text' name='msg' id='m' autoComplete='off' />
              </label>
              <button type='submit' value='Send'>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupChat;
