import React, { Component } from 'react';
import { Cell } from 'components';
const rows = 5;
const cols = 5;

class TurtleContainer extends Component {
  constructor(props) {
    super(props);
    this.keyboardListener = this.keyboardListener.bind(this);
    this.state = {
      gridReady: false,
      turtle: {
        xAxis: 1,
        yAxis: 3
      },
      path: []
    };
  }

  componentDidMount() {
    this.getConstructedGid();
    this.addKeyboardListener();
  }

  getEmptyCell() {
    return {
      asObstacle: false,
      inPath: false,
      xAxis: 0,
      yAxis: 0
    };
  }

  getConstructedGid() {
    const gridArr = [];
    for (let row = 0; row < rows; row++) {
      gridArr[row] = [];
      for (let col = 0; col < cols; col++) {
        const cell = {
          ...(this.getEmptyCell()),
          xAxis: row,
          yAxis: col
        };
        gridArr[row].push(cell);
      }
    }
    this.setState({
      gridReady: true,
      grid: gridArr
    });
  }

  addToPath(xAxis, yAxis) {
    const cell = {
      ...(this.state.grid[xAxis][yAxis]),
      inPath: true
    };
    const {path, grid} = this.state;
    grid[xAxis][yAxis] = cell;
    path.push(cell);
    this.setState({
      path: path,
      grid: grid
    });
  }

  moveTheTurtle() {
    const {path, grid} = this.state;
    if (path.length > 0) {
      const cell = {
        ...path.shift(),
        inPath: false
      };
      const turtlePos = {
        xAxis: cell.xAxis,
        yAxis: cell.yAxis
      };
      grid[cell.xAxis][cell.yAxis] = cell;
      this.setState({
        turtle: turtlePos,
        grid: grid
      });
      setTimeout(() => {
        this.moveTheTurtle();
      }, 100);
    } else {
      this.setState({
        path: []
      });
    }
  }

  addKeyboardListener() {
    document.addEventListener(
      'keypress',
      this.keyboardListener
    );
  }

  moveLeft(rowNo, colNo) {
    // evt.stopPropagation();
    if ((colNo - 1) > -1) {
      const leftCellAxis = colNo - 1;
      this.addToPath(rowNo, leftCellAxis);
    }
  }

  moveTop(rowNo, colNo) {
    // evt.stopPropagation();
    if ((rowNo - 1) > -1) {
      const topCellAxis = rowNo - 1;
      this.addToPath(topCellAxis, colNo);
    }
  }

  moveRight(rowNo, colNo) {
    // evt.stopPropagation();
    if ((colNo + 1) < cols) {
      const rightCellAxis = colNo + 1;
      this.addToPath(rowNo, rightCellAxis);
    }
  }

  moveBottom(rowNo, colNo) {
    // evt.stopPropagation();
    if ((rowNo + 1) < rows) {
      const bottomCellAxis = rowNo + 1;
      this.addToPath(bottomCellAxis, colNo);
    }
  }

  keyboardListener(evt) {
    const {path, turtle} = this.state;
    let rowNo = 0;
    let colNo = 0;
    if (path.length > 0) {
      rowNo = path[path.length - 1].xAxis;
      colNo = path[path.length - 1].yAxis;
    } else {
      rowNo = turtle.xAxis;
      colNo = turtle.yAxis;
    }
    switch (evt.keyCode) {
      case 97:
        this.moveLeft(rowNo, colNo);
        break;
      case 119:
        this.moveTop(rowNo, colNo);
        break;
      case 100:
        this.moveRight(rowNo, colNo);
        break;
      case 115:
        this.moveBottom(rowNo, colNo);
        break;
      case 114:
        this.moveTheTurtle();
        break;
      default:
    }
  }

  renderRow(columns, noOfcols) {
    const row = [];
    for (let col = 0; col < noOfcols; col++) {
      row.push(
        <Cell
          asObstacle = { columns[col].asObstacle }
          inPath = { columns[col].inPath }
          xAxis = { columns[col].xAxis }
          yAxis = { columns[col].yAxis }
          turtlePos = { this.state.turtle }
        />
      );
    }
    return row;
  }

  renderGrid() {
    const {grid} = this.state;
    const gridRows = [];
    for (let row = 0; row < rows; row++) {
      gridRows.push(
        <div>
          { this.renderRow(grid[row], cols) }
        </div>
      );
    }
    return (
      <div>
        { gridRows }
      </div>
    );
  }

  render() {
    const {gridReady} = this.state;
    return (
      <div>
        { gridReady && this.renderGrid() }
      </div>
    );
  }
}

export default TurtleContainer;
