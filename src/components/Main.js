import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Pics from '../pages/Pics';
import DataEntry from '../pages/DataEntry';
import Team from '../pages/Team'

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/pics' component={Pics}></Route>
      <Route exact path='/dataentry' component={DataEntry}></Route>
      <Route exact path='/team' component={Team}></Route>
    </Switch>
  );
}

export default Main;