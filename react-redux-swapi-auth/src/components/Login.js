import React from "react";
import { connect } from "react-redux";

import getPassw from "../actions/getPassw";
import setPassw from "../actions/setPassw";

const Login = ({
  urlPassword,
  localPassword,
  getPassword,
  onChangePassword,
}) => {
  let greeting = isValid(urlPassword, localPassword);
  console.log("-->urlPassword", urlPassword);
  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <input type="text" name="login" placeholder="User1" />
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

const isValid = (urlPassword, localPassword) => {
  console.log(urlPassword, localPassword);
  if (urlPassword === "" || localPassword === "") {
    return "";
  }
  if (urlPassword === localPassword) {
    return "Hello";
  } else return "Incorrect password";
};

const mapStateToProps = (state) => {
  console.log(">>>>>>urlPassword", state.urlPassword);
  console.log(">>>>>>localPassword", state.localPassword);
  return {
    urlPassword: state.urlPassword,
    localPassword: state.localPassword,
  };
};
const mapDispathToProps = (dispath) => {
  return {
    getPassword: () => dispath(getPassw()),
    onChangePassword: (e) => dispath(setPassw(e)),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Login);
