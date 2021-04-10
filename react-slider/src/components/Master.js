import React from "react";
import "./App.css";

const Master = ({click, titleButton, change, level }) => {
    return <div>
        <input type="range" id="level" name="level" min="0" max="99" step="5" defaultValue="0"  onChange={change} />

    <input className="button_play" type="button" onClick={click} value={titleButton} />
        </div>
};
export default Master;