import React, { useState, useEffect } from "react";
import axios from "axios";
import Swapi from "./Swapi";

const Main = () => {
  const [hero, setHero] = useState("");
  const [heroId, setHeroId] = useState(1);
  const [starships, setStarships] = useState([]);
  useEffect(() => {
    const getHero = async (id) => {
      let url = `https://swapi.dev/api/people/${id}/`;
      await axios.get(url).then(function (res) {
        setHero(res.data.name);
        setStarships([]);

        const ships = [];
        res.data.starships.forEach(async (starship) => {
          let url = starship;
          ships.push(
            new Promise((res, req) => {
              axios
                .get(url)
                .then((res2) => {res(res2.data.name)})
                .catch((err) => {console.log("axios err", err)});
            })
          );
        });

        Promise.all(ships)
          .then((val) => {setStarships(val);})
          .catch((err) => {console.log("axios err", err);});
      });
    };
    getHero(heroId);
  }, [heroId]);

  const onChange = (e) => {
    setHeroId(e.target.value);
  };

  return (
    <div className="main">
      <input
        id="number"
        type="number"
        onChange={onChange}
        value={heroId}
      ></input>
      <Swapi hero={hero} starships={starships} />
    </div>
  );
};

export default Main;
