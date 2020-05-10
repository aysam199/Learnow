import React from "react";
import './OurServices.css';

function Header() {
  return (
    <div className="services">
      <h1>Achieve your goals with LearNow</h1>
      <div className="goalsOptions">
        <img className="firstGoalImg" src="/res/learnLatestSkills.png"></img>
        <img className="secondGoalImg" src="/res/readyForCareer.png"></img>
        <img className="thirdGoalImg" src="/res/joinCommunity.png"></img>
      </div>
    </div>
  );
}

export default Header;
