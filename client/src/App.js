import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';

import WebDescription from './components/WebDescription/WebDescription';
import OurServices from './components/OurServices/OurServices';
import Search from './components/Search/Search';
import CoursePage from './pages/CoursePage';
import GroupChat from './components/GroupChat/GroupChat';



function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path='/search/:term/:page' component={Search} />
          <Route path='/coursePage' component={CoursePage} />
          <Route path='/GroupChat' component={GroupChat} />
          <Route path='/'>
            <WebDescription />
            <OurServices />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
