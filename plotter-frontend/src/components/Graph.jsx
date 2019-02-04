import React from 'react';
import axios from 'axios'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries
} from 'react-vis';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      col_x: "annual_inc", 
      col_y: "int_rate",
      canvas_width: 900,
      canvas_height: 500
    };
  }

  getData = (col_x, col_y) => {
    console.log(this.state)
    axios.get(`http://127.0.0.1:5000/getvals/${col_x}/${col_y}`)
    .then((obj) => {
      console.log("Object: ", obj.data)
      if (obj.data.status === "success"){
        this.setState({data: obj.data.data})
        console.log("Data inside: ", obj.data.data)
      }
    })
    .catch((err) => { console.log(err); });
  }

  componentDidMount(){
    this.update()
  }

  update(){
    this.getData(this.state.col_x, this.state.col_y)
    console.log("Data", this.state.data)
  }

  render(){
  return (
    <div className="plot-wrapper">
      <XYPlot width={this.state.canvas_width} height={this.state.canvas_height}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title={this.state.col_x} tickTotal={5}/>
        <YAxis title={this.state.col_y} tickTotal={5}/>
        <MarkSeries
          className="mark-series-example"
          // strokeWidth={1}
          opacity="0.8"
          // sizeRange={[1, 4]}
          data={this.state.data}
        />
      </XYPlot>
    </div>
  )};
}