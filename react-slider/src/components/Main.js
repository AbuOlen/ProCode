import React from "react";
import Master from "./Master";
import Slave from "./Slave";
import "./App.css";

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isToggleOn: true,
          title: "ON",
          level: 0,
        };
      this.handleClick = this.handleClick.bind(this);
      this.changeLevel = this.changeLevel.bind(this);
    }
    handleClick() {
      this.setState((prevState) => ({
        isToggleOn: !prevState.isToggleOn,
        title: !prevState.isToggleOn ? "ON" : "OFF",
      }));
    };
    changeLevel(event){
      if(!this.state.isToggleOn) {
        return;
      }
      this.setState(() => ({
        level: event.target.value,
      }))
    }
    render() {
      return (
        <div className="main">
          <Master
            click={this.handleClick}
            titleButton={this.state.title}
            change={this.changeLevel}
            level={this.state.level} 
          />
          <Slave level={this.state.level} />
        </div>
      );
    }
};

export default Main;
