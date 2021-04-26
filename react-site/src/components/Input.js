import React from "react";
import "./App.css";

const Input = ({isVisible, placeholder} ) => {

    return   <div>
      <input
      hidden = {isVisible}
      placeholder={placeholder}
     />
     </div>
   };

export default Input;