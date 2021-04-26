import React from "react";
import { useState } from "react";
import { BrowserRouter, Switch, Route, Link, useParams } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";

function Header({ setChild }) {
  let [a, setA] = useState(false);
  const [isVisible, setVisible] = useState(false);
  function handleClick() {
    setA(!a);
    setVisible(!isVisible);
  };
  function Dummy() {
    let { id } = useParams();
    setChild(id);
    return null;
};
  return (
    <BrowserRouter>
      <div className="header">
        <Link to="/cats">Cats</Link>
        <Link to="/dogs">Dogs</Link>
        <Input placeholder={"login"} isVisible={isVisible} />
        <Input placeholder={"password"} isVisible={isVisible} />
        <Input placeholder={"welcome"} isVisible={!isVisible} />
        <Button a={a} setA={handleClick} titleBtn="OK" />
        <Switch>
          <Route path="/:id" children ={<Dummy />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default Header;
