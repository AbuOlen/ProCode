const initionalState = 'https://images.dog.ceo/breeds/komondor/n02105505_2043.jpg';

const reducer = (state = initionalState, action) => {
    switch (action.type) {
        case 'DOG_REFRESH':
            return action.newUrl;
        default: 
            return state;
    }
};

export default reducer;