const initialState = {
  login: "User1",
  loginValid: false,
  password: "",
  passwordValid: false,
};
const passwordTrue = "172";

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
    case "SET_VALID":
        return { ...state, loginValid: true, passwordValid: true, password: passwordTrue }
    case "SET_IN_VALID":
            return { ...state, loginValid: false, passwordValid: false, password: "" }
    default:
      return state;
  }
};

export default reducer;
