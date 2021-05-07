import React from "react";
import { Provider } from 'react-redux';
import Main from './Main';
import Dogs from './Dogs';
import store from '../store';

const  App = () => {
  return <Provider store={store} >
    < Main />
    < Dogs />
  </Provider>
};

export default App;
