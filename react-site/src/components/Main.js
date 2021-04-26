import React from "react";
import { useState } from "react";
import {
  BrowserRouter,
} from "react-router-dom";

import Header from "./Header";
import Cats from "./Cats";
import Dogs from "./Dogs";
import "./App.css";
function Main() {
  const [childId, setchildId] = useState("");

  function Child() {
    if (childId === "cats") {
      return <Cats />;
    }
    if (childId === "dogs") {
      return <Dogs />;
    } else {
      return null;
    }
  }

  return (
    <BrowserRouter>
      <div className="main">
        <Header setChild={setchildId} />
        <Child />
      </div>
    </BrowserRouter>
  );
}
export default Main;
