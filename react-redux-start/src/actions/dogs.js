import axios from 'axios';

const DOG_REFRESH = 'DOG_REFRESH';

const btnND = () => dispath => {
    axios.get('https://dog.ceo/api/breeds/image/random')
    .then((res) => {
       dispath({
           type:DOG_REFRESH,
           newUrl: res.data.message
       }) 
    });
};

export default btnND;