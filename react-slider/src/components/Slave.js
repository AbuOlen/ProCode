import React from "react";
class Slave extends React.Component {
  constructor(props) {
    super(props);
  };
  
  render() {
    const level = this.props.level;
  return (
    <div className="slave"> <p>{ level }</p></div> 
  );
};
};
export default Slave;
