
const SET_PASSWORD = 'SET_PASSWORD';

const setPassw = (e) => dispatch => {
    dispatch({
        type:SET_PASSWORD,
        localPassword: e.target.value,
    })
}

export default setPassw;