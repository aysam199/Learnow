import React, { useState, useEffect } from 'react';
import axiosGet from '../../utils/axiosGet';
import './UsersList.css';

const UsersList = ({ groupId, socket, connectedUsers, setConnectedUsers}) => {
  const [usersArray, setUsersArray] = useState([]);

  socket.on('update connected users', users => {
    setConnectedUsers([...users]);
  });

  useEffect(() => {
    if (connectedUsers && usersArray) {
      usersArray.sort(curr => {
        return connectedUsers.includes(curr) ? 1 : -1;
      });
    }
  }, [connectedUsers]);

  const status = userName => {
    let classes = 'status';
    if (connectedUsers) {
      if (connectedUsers.includes(userName)) classes += ' online';
    }
    return classes;
  };

  const getUsers = () => {
    axiosGet(`/users/get/groupid=${groupId}`)
      .then(res => {
        setUsersArray(res.data);
      })
      .catch(err => setUsersArray(['Could not fetch users!']));
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!usersArray ||!usersArray.length) return <span>Loading users...</span>;

  return (
    <ul className='users-list'>
      {usersArray.map(user => {
        return (
          <li key={user.user_id} className='user-listing'>
            <img src={user.picture} className='mini-user-pic' />
            <h3 className='user-in-list'>{user.user_name}</h3>
            <div className={status(user.user_name)}></div>
          </li>
        );
      })}
    </ul>
  );
};

export default UsersList;
