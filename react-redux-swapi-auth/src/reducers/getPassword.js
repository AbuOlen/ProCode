
const initialState = '';

const reducerGet = (state = initialState, action) => {
    console.log('state>>>>>', state);
    switch (action.type) {
        case 'GET_PASSWORD':
            return action.urlPassword;
        default: 
            return state;
    }
};

export default reducerGet;