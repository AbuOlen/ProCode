const initionalState = '';

const reducerSet = (state = initionalState, action) => {
    console.log('state>>>>>', state);
    switch (action.type) {
        
        case 'SET_PASSWORD':
            return action.localPassword;
        default: 
            return state;
    }
};

export default reducerSet;