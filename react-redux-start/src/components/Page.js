import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import *  as actions from '../actions/changeValues';


const Page =({ count, plus1, minus1, plus5, plusP, plusR, reset, status, revert })=>{
    return <div>
         <h1> { count } </h1>
         <hr />
         <button onClick={ plus1 } className='plus1' type='button'>+1</button>
         <button onClick={ minus1 } className='minus1' type='button'>-1</button>
         <button onClick={ plus5 } className='plus5' type='button'>+5</button>
         <button onClick={ plusP } className='plusp' type='button'>+p</button>
         <button onClick={ plusR } className='plusr' type='button'>+r</button>
         <button onClick={ reset } className='reset' type='button'>reset</button>
         <hr />

         <h1> { status.toString() } </h1>
         <hr />
         <button onClick={ revert } className='revert' type='button'>revert</button>
    </div>
};
const mapStateToProps = state => {
    return { 
        count: state.count,
        status: state.status,
    };
};
const mapDispathToProps = dispath => {
    const { plus1, minus1, plus5, plusP, plusR, reset, revert} = bindActionCreators(actions, dispath); // dispath(actions) -> bindActionCreators(actions, dispath)
    return {
        plus1,
        minus1,
        plus5,
        plusP,
        plusR,
        reset,
        revert,
    }
};


export default connect(mapStateToProps,mapDispathToProps)(Page);
//export default connect(mapStateToProps, actions)(Page);