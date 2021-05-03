const initialState =  0;
const reducerCount = (state = initialState, action) => {
  switch (action.type) {
    case "COUNTER_PLUS1":
      return state + 1;
    case "COUNTER_MINUS1":
      return state - 1;
    case "COUNTER_PLUS5":
      return state + 5;
    case "COUNTER_PLUS_PARAM":
      return state + action.param;
    case "COUNTER_PLUS_RANDOM":
      return state + action.param;
    case "RESET":
        return initialState;  
    default:
      return state;
  }
};
export default reducerCount;
