import React, { useState } from 'react';
import './CreateGroup.css';
import axiosPost from '../../utils/axiosPost';
import { useAuth0 } from '../../react-auth0-spa';
import RequestLogin from '../RequestLogin/RequestLogin';


const CreateGroup = ({ courseId ,setCreating }) => {

  const { user,isAuthenticated,loading } = useAuth0();
  const [creation, setCreation] = useState(false);
  const [err, setErr] = useState(null);
  
  const createGroup = e => {
    e.preventDefault();
    if(!isAuthenticated){
      setErr('Not logged in');
    }
    else
    {
    const name = e.target.name.value;
    const description = e.target.description.value;
    const creatorId = user.sub.split('|')[1];
    axiosPost(`/groups/add`, {
      name,
      description,
      course: courseId,
      creatorId,
    })
      .then(res => {
        setCreation(true);
      })

      .catch(err => {
        setErr(true);
      });
    }
  };


  if (err){
    if(err==='Not logged in'){
      return <RequestLogin
      setErr={setErr}
      />
    }
    return (
      <div className='create-group-container'>
        <span>Oops! an error happen please try a different name!</span>
        <button 
          onClick={() => setErr(false)}
          className='send-btn grow'
          type='submit'
          value='Try again'
        >
          Try Again!
        </button>
      </div>
    );

  }
  if (creation) {
    return (
      <div className='create-group-container'>
        <span>Group has been created!</span>
        <button
          onClick={() =>{
             setCreation(false)
             setCreating(false)
          }}
          className='send-btn grow'
          type='submit'
          value='Close'
        >
          Close & Update
        </button>
      </div>
    );
  }
  return (
    <div className='create-group-container'>
      <form className='info-form' onSubmit={createGroup}>
        <span>Group name</span>
        <label htmlFor='name'>
          <input type='text' name='name' autoComplete='off' required />
        </label>
        <span>Group description</span>
        <label htmlFor='description'>
          <input type='text' name='description' autoComplete='off' required />
        </label>
        <button className='send-btn grow' type='submit' value='Send'>
          Create group!
        </button>
      </form>
    </div>
  );
};

export default CreateGroup;
