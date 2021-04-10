import React from "react";
import "./App.css";

class Master extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
  }
  handleClick(e) {
    this.props.onHandleClick(e.target.value);
  }
  changeLevel(e) {
    this.props.onChangeLevel(e.target.value);
  }
  render() {
    const level = this.props.level;
    const titleButton = this.props.titleButton;
    return (
      <div className="master">
        <input
          className="range"
          type="range"
          name="level"
          min="0"
          max="99"
          step="1"
          defaultValue={level}
          onChange={this.changeLevel}
        /><br></br>
        <input
          className="button_play"
          type="button"
          onClick={this.handleClick}
          value={titleButton}
        />
      </div>
    );
  }
}

export default Master;
