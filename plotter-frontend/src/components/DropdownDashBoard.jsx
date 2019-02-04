import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Graph from './Graph'

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    },
  });


class DropdownDashBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            col_x: "",
            col_y: "",
            columns : [],
            limit: '',
            filename: 'test.csv',
            filenames: ['test.csv'],
            plot: 0
        };
    }

    handleChange = name => event => {
        if (name === "col_x" || name === "col_y"){
            this.setState({ plot: 0 })
        }
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = () => {
        console.log( this.state.filename, this.state.limit)
        this.setState({ plot: 0 })
        axios.post(`http://127.0.0.1:5000/readcsv`,{
            filename: this.state.filename,
            limit: this.state.limit
        })
        .then(obj => console.log(obj))
        .then(() => {
            return axios.get(`http://127.0.0.1:5000/getcols`)
        })
        .then(obj => {
            console.log("Inner Data", obj.data)
            if (obj.data.status === "success"){
                this.setState({ columns: obj.data.data })
            }
        })
        .catch(error => {
            console.log(error)
        });
    }

    handlePlot = () => {
        this.setState({ plot: 1 })
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <div>
                    <TextField
                        id="standard-select-filename"
                        select
                        label="Dataset"
                        className={classes.textField}
                        value={this.state.filename}
                        onChange={this.handleChange('filename')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal">
                        {this.state.filenames.map(file => (
                            <MenuItem key={file} value={file}>
                                {file}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="standard-limit"
                        label="Limit"
                        value={this.state.limit}
                        onChange={this.handleChange('limit')}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                    />
                    <Button 
                        style={{marginTop: '2em'}}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </div>
                <div>
                    <TextField
                        id="standard-select-col-x"
                        select
                        label="X axis"
                        className={classes.textField}
                        value={this.state.col_x}
                        onChange={this.handleChange('col_x')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal">
                        {this.state.columns.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="standard-select-col-y"
                        select
                        label="Y axis"
                        className={classes.textField}
                        value={this.state.col_y}
                        onChange={this.handleChange('col_y')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal">
                        {this.state.columns.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button 
                        style={{marginTop: '2em'}}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handlePlot}>
                        Plot
                    </Button>
                </div>
                <div>
                     {this.state.plot === 1 && <Graph col_x={this.state.col_x} col_y={this.state.col_y}></Graph>}
                </div>
            </div>
        )
    };
}

DropdownDashBoard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(DropdownDashBoard);