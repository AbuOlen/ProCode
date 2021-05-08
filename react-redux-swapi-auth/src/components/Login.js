import React from "react";
import { connect } from "react-redux";

import getPassw from "../actions/getPassw";
import setPassw from "../actions/setPassw";
import getUs from "../actions/getUs";
import setUs from "../actions/setUs";

const Login = ({
  urlPassword,
  localPassword,
  getPassword,
  onChangePassword,
  onChangeUser,
  userName,
  setLogin,
}) => {
  let greeting = isValid(urlPassword, localPassword, userName, setLogin);
  console.log("-->urlPassword", urlPassword);
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <input onChange={onChangeUser}type="text" name="login" placeholder="User1" />
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

const isValid = (urlPassword, localPassword, userName, setLogin) => {
  console.log(urlPassword, localPassword);
  if (urlPassword === "" || localPassword === "" || userName === "" || setLogin === "") {
    return "";
  }
  if ((urlPassword === localPassword) && (userName === setLogin)){
    return "Hello";
  } else return "Incorrect password";
};

const mapStateToProps = (state) => {
  console.log(">>>>>>urlPassword", state.urlPassword);
  console.log(">>>>>>localPassword", state.localPassword);
  return {
    urlPassword: state.urlPassword,
    localPassword: state.localPassword,
    userName: state.userName,
    setLogin: state.setLogin,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    getPassword: () => dispatch(getPassw()),
    onChangePassword: (e) => dispatch(setPassw(e)),
    onChangeUser: (e) => dispatch(setUs(e)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Login);
