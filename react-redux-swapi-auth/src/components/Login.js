import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";

import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from '@material-ui/core/Button';

const Login = ({
  login,
  password,
  passwordValid,
  getPassword,
  onChangePassword,
  onChangeLogin,
  loginValid,
  setValid,
  setInValid,
}) => {
  const useStyles = makeStyles((theme) => ({
    enterField: {
      "& > *": {
        margin: theme.spacing(1),
        left:"30px",
        width: "25ch",
      },
    },
    loginform: {
        margin: theme.spacing(7),
    },
    btn: {
        margin: theme.spacing(7),
        left:"40px",
        top:"-100px",
    },
  }));

  const [value, setValue] = useState("enterLog");
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log('value', value);
  };
  let greeting = isValid(passwordValid, loginValid, login, password, value);
  const classes = useStyles();
  return (
    <div>
      <FormControl component="fieldset" className={classes.loginform}>
        <FormLabel component="legend"><h1>Login Page</h1></FormLabel>
        <RadioGroup
          aria-label="auth"
          name="auth"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="enterLog"
            onChange={setInValid}
            control={<Radio />}
            label="Please enter:"
          >
          </FormControlLabel>
          <form className={classes.enterField} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              onChange={onChangeLogin}
              label="login"
              variant="outlined"
            />
            <br />
            <TextField
              id="outlined-basic"
              onChange={onChangePassword}
              label="password"
              variant="outlined"
            />
            <br />
          </form>

          <FormControlLabel
            value="saved"
            onChange={setValid}
            control={<Radio />}
            label="Or choose saved"
          />
        </RadioGroup>
        <br />
        
      </FormControl>
      <br />
      <Button onClick={getPassword} variant="contained" className={classes.btn}>Submit</Button>
      <br />
      <div>{greeting} </div>
    </div>
  );
};

const isValid = (passwordValid, loginValid, login, password, value) => {
  console.log(passwordValid, loginValid, value);
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
    setValid: () => dispatch(actions.setVal()),
    setInValid: () => dispatch(actions.setInVal()),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(Login);
