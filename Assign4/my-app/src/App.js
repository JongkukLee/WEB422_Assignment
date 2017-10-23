import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Overview from './Overview.js'
import Projects from './Projects.js'
import Employees from './Employees.js'
import Teams from './Teams.js'
import RouteNotFound from './RouteNotFound.js'

class App extends Component {

  render() {
    let url = "https://agile-retreat-67872.herokuapp.com/";    
    return ( 
      <Switch>
      <Route exact path='/' render={() => (
        <Overview title="Overview" dataSource={url} /> 
      )}/>
      <Route exact path='/projects' render={() => (
              <Projects title="Projects" dataSource={url + "projects"} />
      )}/>
      <Route exact path='/employees' render={() => (
              <Employees title="Employees" dataSource={url + "employees"} />
      )}/>
      <Route exact path='/teams' render={() => (
              <Teams title="Teams" dataSource={url + "teams"} />
      )}/>
      <Route render={() => (
              <RouteNotFound title="Not Found" />
      )}/>
  </Switch>      

    ); 
  }  
}

export default App;