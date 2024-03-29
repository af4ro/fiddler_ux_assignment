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
import { Divider, Typography } from '@material-ui/core';

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      col_x: this.props.col_x, 
      col_y: this.props.col_y,
      canvas_width: 0,
      canvas_height: 0,
      ticks: 7,
      yflag: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  getData = (col_x, col_y) => {
    console.log(this.state)
    axios.get(`http://127.0.0.1:5000/getvals/${col_x}/${col_y}`)
    .then((obj) => {
      // console.log("Object: ", obj.data)
      if (obj.data.status === "success"){
        this.setState({
          data: obj.data.data,
          yflag: obj.data.yflag
        })
        // console.log("Data inside: ", obj.data.data)
      }
    })
    .catch((err) => { console.log(err); });
  }

  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.update()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ canvas_width: window.innerWidth - 100, canvas_height: window.innerHeight / 2 });
  }

  update(){
    this.getData(this.state.col_x, this.state.col_y)
    // console.log("Data", this.state.data)
  }

  render(){
    var tickProps = {}
    // console.log(this.state.data)
    if (this.state.yflag === 1){
        tickProps = {
          tickLabelAngle: 55
        }
    }
  return (
    <div className="plot-wrapper">
      <Divider style={{marginBottom: '1em'}}/>
      <Typography style={{marginBottom: '1em'}}>{this.state.col_x} vs {this.state.col_y}</Typography>
      <XYPlot width={this.state.canvas_width} height={this.state.canvas_height}>
        <XAxis title={this.state.col_x} tickTotal={this.state.ticks}/>
        <YAxis title={this.state.col_y} tickTotal={this.state.ticks} {...tickProps}/>
        <VerticalGridLines tickTotal={this.state.ticks}/>
        <HorizontalGridLines tickTotal={this.state.ticks}/>
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