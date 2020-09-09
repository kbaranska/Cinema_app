import React from 'react';
import './App.css';
import NavBar from  './components/navBar/navbar'
import Movies from  './components/movies/movies.tsx'
import  Tickets  from './components/tickets/tickets';
import  Seats from './components/seats/seats';
import { Route } from 'react-router';
import {BrowserRouter} from 'react-router-dom'
function App() {
 
  return (
<div className="body" >
    <NavBar ></NavBar>
    <div className="main">
<BrowserRouter>
<Route exact path="/movies" component={Movies}/>
<Route exact path="/tickets" component={Tickets}/>
<Route exact path="/seats" component={Seats}/>

</BrowserRouter>
</div>
</div>
  );
}

export default App;
