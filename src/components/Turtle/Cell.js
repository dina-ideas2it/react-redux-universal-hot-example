import React, { Component, PropTypes } from 'react';
import { Turtle } from 'components';
const styles = require('./Cell.scss');

export default class Cell extends Component {

  constructor(props) {
    super(props);
    this.renderTurtle = this.renderTurtle.bind(this);
  }

  renderTurtle() {
    const turtleXAxis = this.props.turtlePos.xAxis;
    const turtleYAxis = this.props.turtlePos.yAxis;
    const {xAxis, yAxis} = this.props;
    if (xAxis === turtleXAxis && yAxis === turtleYAxis) {
      return (
        <Turtle />
      );
    }
  }

  render() {
    const cellClass = this.props.inPath ? styles.cell + ' ' + styles.inPath
      : styles.cell;
    return (
      <div className = {cellClass}>
        <div className = {styles.cellContainer}>
        { this.renderTurtle() }
        </div>
      </div>
    );
  }
}

Cell.propTypes = {
  asObstacle: PropTypes.bool,
  inPath: PropTypes.bool,
  xAxis: PropTypes.number.isRequired,
  yAxis: PropTypes.number.isRequired,
  turtlePos: PropTypes.object.isRequired
};
