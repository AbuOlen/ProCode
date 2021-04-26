import React from "react";

const Link = ({url, name, }) => {
 return   <div className="item" key={ url }>
  <a href = {url }> {name} </a>
  </div>
};

export default Link;