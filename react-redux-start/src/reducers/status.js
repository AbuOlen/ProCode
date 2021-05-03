const initialState =  true;
const reducerStatus = (state = initialState, action) => {
  switch (action.type) {
    case "STATUS":
      return !state;
    default:
      return state;
  }
};
export default reducerStatus;