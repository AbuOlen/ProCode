import React from "react";
import './Button.css';

const Button = ({a, setA, titleBtn, classname} ) => {

    return   <div>
      <button
      onClick={ setA }
      className = {classname}>
     {titleBtn} 
     </button>
     </div>
   };

export default Button;