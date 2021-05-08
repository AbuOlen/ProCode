import axios from 'axios';

const GET_PASSWORD = 'GET_PASSWORD';

const getPassw = () => dispatch => {
    axios.get('https://swapi.dev/api/people/1/')
    .then((res) => {
        console.log('>>>>>>', res.data.height);
       dispatch({
           type:GET_PASSWORD,
           urlPassword: res.data.height
       })
    })
    .catch((err) => {
        console.log("axios err", err);
      });
};


export default getPassw;