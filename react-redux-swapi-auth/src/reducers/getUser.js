const initialState = 'User1';

const reducerGetUser = (state = initialState, action) => {
    console.log('state>>>>>', state);
    switch (action.type) {
        case 'GET_USER':
            return action.userName;
        default: 
            return state;
    }
};

export default reducerGetUser;