const initialState = {
  login: "User1",
  loginValid: false,
  password: "",
  passwordValid: false,
};

const reducer = (state = initialState, action) => {
  console.log("state>>>>>", state);
  switch (action.type) {
    case "GET_PASSWORD":
        return { ...state, passwordValid: action.password === state.password}
    case "SET_PASSWORD":
        return { ...state, password: action.localPassword}
    case "GET_USER":
        return { ...state}
    case "SET_USER":
        return { ...state, loginValid: action.setLogin === state.login }
    default:
      return state;
  }
};

export default reducer;
