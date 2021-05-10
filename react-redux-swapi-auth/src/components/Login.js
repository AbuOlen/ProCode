import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions/actions";

const Login = ({
  login,
  password,
  passwordValid,
  getPassword,
  onChangePassword,
  onChangeLogin,
  loginValid,
}) => {
  let greeting = isValid(passwordValid, loginValid, login, password);
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <input
          onChange={onChangeLogin}
          type="text"
          name="login"
          placeholder="login"
        />
        <br />
        <input
          onChange={onChangePassword}
          type="password"
          name="password"
          placeholder="password"
        />
        <br />
        <button onClick={getPassword} type="button">
          Submit
        </button>
      </form>
      <div>{greeting} </div>
    </div>
  );
};

const isValid = (passwordValid, loginValid, login, password) => {
  console.log(passwordValid, loginValid);
  if (login === "" || password === "") {
    return "";
  }
  if (passwordValid && loginValid) {
    return "Hello";
  } else return "Incorrect password";
};

const mapStateToProps = (state) => {
  return {
    password: state.password,
    passwordValid: state.passwordValid,
    login: state.login,
    loginValid: state.loginValid,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    getPassword: () => dispatch(actions.getPassw()),
    onChangePassword: (e) => dispatch(actions.setPassw(e)),
    onChangeLogin: (e) => dispatch(actions.setUs(e)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Login);
