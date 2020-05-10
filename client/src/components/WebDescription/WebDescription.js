import './WebDescription.css';
import React from 'react';
import Link from '@material-ui/core/Link';
import { useAuth0 } from "../../react-auth0-spa";

const WebDescription = () =>{
const{loginWithPopup} = useAuth0();
  
  return(

    <div className='container'>
      <div className='description'>
        <div className='bg-image'></div>
        <div className='content'>
          <h1>Your journey for learning</h1>
          <p>Build new skills with groups of self learners, join a group and be part of the community</p>
        </div>
                <div className="joinForFree" onClick={() => loginWithPopup({})}>Join for free</div>
        <div className='description-under-header' >
          <h1>Find a suitable course for the subject you want, join a group and learn together!</h1>
          <div className='speration-line'></div>
        </div>
      </div>
    </div>
);}


export default WebDescription;
