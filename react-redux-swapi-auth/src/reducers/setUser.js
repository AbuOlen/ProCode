const initionalState = '';

const reducerSetUser = (state = initionalState, action) => {
    console.log('state>>>>>', state);
    switch (action.type) {
        
        case 'SET_USER':
            return action.setLogin;
        default: 
            return state;
    }
};

export default reducerSetUser;