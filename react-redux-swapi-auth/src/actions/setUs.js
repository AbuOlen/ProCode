const SET_USER = 'SET_USER';

const setUs = (e) => dispatch => {
    dispatch({
        type:SET_USER,
        setLogin: e.target.value,
    })
}

export default setUs;