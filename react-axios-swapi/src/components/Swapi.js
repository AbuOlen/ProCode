import React from "react";

const Swapi = ({hero, starships}) => {
  
  return <div className="swapi">
      <p>{hero}</p>
      <br />
      <ol>{starships.map((starship) => (
      <li key={starship}>{starship}</li>))}</ol>
    </div>;
};

export default Swapi;
