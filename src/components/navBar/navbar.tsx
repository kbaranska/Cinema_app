import React from 'react';
import logo from '../../images/logo.png';
import menu from '../../images/menu.png';
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
const { Component } = require("react");

class NavBar extends Component {

  render() {
    const collapseMenu = () => {
      console.log('Click!!!!');
      let ids: Array<string> = ["Aref1", "Aref2"]
      // const ids=["Aref1", "Aref2","Aref3", "Aref4","Aref5"]
      // console.log(document.getElementById(ids[1]).style.visibility)
      //  if(document.getElementById(ids[1]).style.visibility=="" || document.getElementById(ids[1]).style.visibility=="hidden"){
      const elem: HTMLElement = document.getElementById(ids[0]);
      console.log(elem.style.display)
      if (elem.style.display === "" || elem.style.display === "none") 
        {
          document.getElementById(ids[0]).style.display = "block"
        } else {
          document.getElementById(ids[0]).style.display = "none"
        }
        //   for (var i = 0; i < ids.length; i++) {
        //     //  document.getElementById(ids[i]).style.visibility="visible"
        //     document.getElementById(ids[i]).style.display = "inline-block"

        //   }
        // }
        // else {
        //   for (var i = 0; i < ids.length; i++) {
        //     // document.getElementById(ids[i]).style.visibility="hidden"
        //     document.getElementById(ids[i]).style.display = "none"

        //   }
        // }
      }
      return (
        <div className="all">
          {/* <div className="sidenav2"></div> */}
          {/* <div className="sidenav "> */}
          <a onClick={() => collapseMenu()} className="icon" >
            <img className="menu" src={menu} ></img>
          </a>
          <div className="wrap" >
            <div className="img_div">
              <img className="logo_img" src={logo} alt="" />
            </div>
            <div id="Aref1" className="aLinks">
              <a href="/" >MAIN </a>

              <a href="movies" id="Aref2">NOW PLAYING</a>
              <a>PRICES</a>
              <a>COMING SOON</a>
            </div>
          </div>
        </div>

      );
    }
  }
  export default NavBar;