import React, { useState } from "react";
import Info from "./Info";
import "./App.css";

const Swapi = ({ hero, starships }) => {
  const [isVisible, setVisible] = useState(false);
  const [starship, setStarship] = useState({});

  const onHover = (e) => {
    setVisible(true);
    setStarship(starships[e.target.id]);
  };
  const onLeave = () => {
    setVisible(false);
  };

  return (
    <div className="swapi">
      <p>{hero}</p>
      <br />
      <ol>
        {starships.map((starship, i) => (
          <li
            id={i}
            onMouseOver={onHover}
            onMouseLeave={onLeave}
            key={starship.name}
            className="holder"
          >
            {starship.name}
          </li>
        ))}
      </ol>
      {isVisible && (
        <div
          className="info"
          style={{
            opacity: { isVisible },
          }}
        >
          <Info starship={starship} />
        </div>
      )}
    </div>
  );
};

export default Swapi;
