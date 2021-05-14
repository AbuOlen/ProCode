import axios from 'axios';

const GET_PASSWORD = 'GET_PASSWORD';
const GET_USER = 'GET_USER';
const SET_USER = 'SET_USER';
const SET_PASSWORD = 'SET_PASSWORD';
const SET_VALID = 'SET_VALID';
const SET_IN_VALID = "SET_IN_VALID";

export const getPassw = () => dispatch => {
    axios.get('https://swapi.dev/api/people/1/')
    .then((res) => {
        //console.log('>>>>>>', res.data.height);
       dispatch({
           type:GET_PASSWORD,
           password: res.data.height
       })
    })
    .catch((err) => {
        console.log("axios err", err);
      });
};

export const getUs = () => dispatch => {
    dispatch({
        type: GET_USER,
    })
};

export const setUs = (e) => dispatch => {
    dispatch({
        type:SET_USER,
        setLogin: e.target.value,
    })
};

export const setPassw = (e) => dispatch => {
    dispatch({
        type: SET_PASSWORD,
        localPassword: e.target.value,
    })
};

export const setVal = () => dispatch => {
    dispatch({
        type: SET_VALID,
    })
};

export const setInVal = () => dispatch => {
    dispatch({
        type: SET_IN_VALID,
    })
};
