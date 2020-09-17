import React from 'react';
import './App.css';
import NavBar from  './components/navBar/navbar'
import Movies from  './components/movies/movies.tsx'
import  Tickets  from './components/tickets/tickets';
import  Seats from './components/seats/seats';
import { Route } from 'react-router';
import {BrowserRouter} from 'react-router-dom'
import Summary from './components/summary/summary';
import MainView from './components/mainView/main-view';
function App() {
 
  return (
<div className="body" >
    <NavBar ></NavBar>
    <div className="main">
<BrowserRouter>
<Route exact path="/" component={MainView}/>
<Route exact path="/movies" component={Movies}/>
<Route exact path="/tickets" component={Tickets}/>
<Route exact path="/seats" component={Seats}/>
<Route exact path="/summary" component={Summary}/>

</BrowserRouter>
</div>
</div>
  );
}

export default App;
