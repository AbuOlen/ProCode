import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

import "./App.css";

const Dogs = () => {
  const [url, setUrl] = useState("");
  const [isRendered, setIsRendered] = useState(false);
  
  const getDog = async () => {
    return await axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        setIsRendered(true);
        setUrl(res.data.message);
      });
  };
  useEffect(() => {
    getDog();
  }, [isRendered]);

  return (
    <div className="cats">
      <img src={url} className="cat_img" alt="" />
     <Loader />
    </div>
  );
};
export default Dogs;
