/********************************************************************************* 
* WEB422 – Assignment 04 
*	I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this 
* assignment has been copied manually or electronically from any other source (including web sites) or  
* distributed to other students. 
*  
*	Name: _Jongkuk Lee____________ Student ID: _127730158____ Date: _2017-11-24_____ 
* 
********************************************************************************/  
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom' 
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'))

registerServiceWorker();
