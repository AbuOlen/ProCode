import React from "react";
import "./App.css";

const Info = ({ starship }) => {
  const shipSpecs = (s) => {
    return (
      <p>
        model: {s.model} <br />
        manufacturer: {s.manufacturer}
        <br />
        length: {s.length}
        <br />
        max atmosphering speed: {s.max_atmosphering_speed}
        <br />
        cargo_capacity: {s.cargo_capacity}
        <br />
        hyperdrive rating: {s.crehyperdrive_ratingw}
        <br />
        starship class: {s.starship_class}
      </p>
    );
  };

  return <div>{shipSpecs(starship)}</div>;
};

export default Info;
