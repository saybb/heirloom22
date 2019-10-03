import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Welcome extends Component {
   state = { text: "Welcome" };

   render() {
      return (
         <div className="Welcome">
            <h1>{this.state.text}</h1>
            <li>
               <NavLink to="/">Home</NavLink>
            </li>
         </div>
      );
   }
}

export default Welcome;
