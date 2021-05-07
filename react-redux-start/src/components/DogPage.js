import React from "react";
import { connect } from 'react-redux';

import btnND from '../actions/dogs';


const DogPage =({  urlImg, btnNewDog })=>{
    return <div>
        <br />
        <hr />
        <br />

         <button onClick={ btnNewDog }  type='button'>NEW DOG</button>
         <hr />

         <img src={ urlImg } alt="" />
    </div>
};
const mapStateToProps = state => {
    return { 
        urlImg: state.urlDog,
    };
};
const mapDispathToProps = dispath => {
    
    return {
        btnNewDog: () => dispath(btnND()),
    }
};


export default connect(mapStateToProps,mapDispathToProps)(DogPage);