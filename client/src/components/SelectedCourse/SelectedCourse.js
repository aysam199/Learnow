import React from 'react';
import './SelectedCourse.css';
import {
  Link,
} from 'react-router-dom';


function SelectedCourse({ state, setState}) { 
  
  window.onbeforeunload = () => {
    setState({ ...state, selectedCourse: null });
  };

  let fullURL = `https://www.udemy.com`+state.selectedCourse.url
  


  return (
    <div>
      <div className="greyBackGround">
        <img onClick={() => setState({ ...state, selectedCourse: null })} 
          className="backIcon" src='/res/backIcon.png'/>
        <h2 className="courseTitle">{state.selectedCourse.title}</h2>
        <h3 className="courseDesc">{state.selectedCourse.headline}</h3>
        <h4 className="coursePrice">{state.selectedCourse.price} the price for this course</h4>
        <h4 className="courseURL">Visit course page on udemy <a style={{ color: 'wheat ' }} href={fullURL} target='_blank' >HERE</a>.</h4>
        <img className="courseImage" src={state.selectedCourse.image_240x135}/>
        
      </div>

    </div>
  );
}

export default SelectedCourse;
