import React from 'react';
import logo from '../../images/logo.png';
import menu from '../../images/menu.png';
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const { Component } = require("react");

class NavBar extends Component{
 
    render(){
     const collapseMenu = () => {
        console.log('Click!!!!');
        let ids:Array<string>=["Aref1"]
        // const ids=["Aref1", "Aref2","Aref3", "Aref4","Aref5"]
        // console.log(document.getElementById(ids[1]).style.visibility)
      //  if(document.getElementById(ids[1]).style.visibility=="" || document.getElementById(ids[1]).style.visibility=="hidden"){
       const elem : HTMLElement = document.getElementById(ids[0]);
        if(elem.style.display==="" || elem.style.display==="none"){

 for(var i=0;i<ids.length;i++)
 {
  //  document.getElementById(ids[i]).style.visibility="visible"
  document.getElementById(ids[i]).style.display="block"

}}
 else{for(var i=0;i<ids.length;i++)
  {
    // document.getElementById(ids[i]).style.visibility="hidden"
    document.getElementById(ids[i]).style.display="none"

  }}
    }   
    return(
<div>
<div className="sidenav2"></div>
<div className="sidenav ">
<img  className="logo_img" src={logo} alt=""></img>
<a onClick={()=>console.log("tets")} className="icon" >
    <img className="menu"src={menu} onClick={()=>collapseMenu()}></img>
  </a>
<div id="myLinks">
<a href="movies"id="Aref1">Movies</a>

  
  </div>
</div>

</div>
);
}
}
export default NavBar;