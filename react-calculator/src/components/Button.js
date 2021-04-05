import React from "react";
import './Button.css';

const Button = ({a, setA, titleBtn, growth}) => {

  const btnClick = () => {
    console.log(a);
    setA(Number(a) + growth);
  };
    return   <div>
      <button
      onClick={ btnClick}>
     {titleBtn} 
     </button>
     </div>
   };

export default Button;