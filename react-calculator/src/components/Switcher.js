import React from 'react';
import { useState } from "react";
import Button from "./Button";

const Switcher = () => {

    let [count, setCount] = useState(0);
    let [inputValue, setInputValue] = useState(0);

    const handleChange = (e) => {
        console.log('handle change called');
        setCount(e.target.value);
        setInputValue(e.target.value);
      };
    
    return   <div>
        <Button a = { count }
        setA = { setCount }
        titleBtn =  {'+'}
        growth = { 1 }
        />  
        
        <Button a = { count }
        setA = { setCount }
        titleBtn =  {'-'}
        growth = { -1 }
        />
        
        <input type="text" 
        value={ count } 
        onChange={(e) =>  handleChange(e)} />
    </div>
};
export default Switcher;