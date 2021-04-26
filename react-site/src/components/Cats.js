import React from "react";
import { useState } from "react";
import { useEffect } from "react";
//import { unmountComponentAtNode, render } from "react-dom";
import axios from "axios";
import Loader from "./Loader";

import "./App.css";

const Cats = () => {
  const [url, setUrl] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  //   const mount = () => {
  //     console.log(">>>> render");
  //     render(<Loader />, document.getElementById("animation"));
  //   };
  //   const unmount = () => {
  //     console.log(">>>> unmound");
  //     unmountComponentAtNode(document.getElementById("animation"));
  //   };//
  const getCats = async () => {
    return await axios
      .get("https://api.thecatapi.com/v1/images/search")
      .then((res) => {
        setIsRendered(true);
        setUrl(res.data[0].url);
      });
  };
  useEffect(() => {
    getCats();
  }, [isRendered]);

  return (
    <div className="cats">
      <img src={url} className="cat_img" alt="" />
     <Loader />
    </div>
  );
};
export default Cats;
