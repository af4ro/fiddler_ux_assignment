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
      data: []
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
    this.getData("annual_inc", "int_rate")
    console.log("Data", this.state.data)
  }

  render(){
  return (
    <XYPlot width={1200} height={500}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <MarkSeries
        className="mark-series-example"
        // strokeWidth={1}
        opacity="0.8"
        // sizeRange={[5, 15]}
        data={this.state.data}
      />
    </XYPlot>
  )};
}