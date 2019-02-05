import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Graph from './Graph'
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    menu: {
      width: 200,
    }
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
            snacktext: "CSV file read!",
            plot: 0,
            snackopen: false,
            disable_buttons: true
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
        
        axios.post(`http://127.0.0.1:5000/readcsv`,{
            filename: this.state.filename,
            limit: this.state.limit
        })
        .then(obj => {
            // console.log(obj.data)
            if (obj.data.status === "success"){
                this.setState({ 
                    plot: 0,
                    snackopen: true,
                    snacktext: "CSV file read!",
                    disable_buttons: false
                })
            }
        })
        .then(() => {
            return axios.get(`http://127.0.0.1:5000/getcols`)
        })
        .then(obj => {
            console.log("Inner Data", obj.data)
            if (obj.data.status === "success"){
                this.setState({ 
                    columns: obj.data.data 
                })
            }
        })
        .catch(error => {
            console.log(error)
            console.log("Reading error")
                this.setState({ 
                    snackopen: true,
                    snacktext: "Error reading CSV"
                })
        });
    }

    handlePlot = () => {
        this.setState({ plot: 1 })
    }

    handleClose = () => {
        this.setState({ snackopen: false })
    }

    render(){
        const { classes } = this.props;
        var buttonsDisabled = {}
        if (this.state.disable_buttons){
            buttonsDisabled = { disabled: this.state.disable_buttons}
        }
        
        return(
            <div>
                <Divider style={{marginBottom: '1em'}}/>
                <div style={{display: 'flex'}}>
                <div style={{flexGrow: 1}}>
                    <TextField
                        id="standard-select-filename"
                        select
                        label="Dataset"
                        className={classes.textField}
                        variant="outlined"
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
                        variant="outlined"
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
                    <Snackbar
                        open={this.state.snackopen}
                        onClose={this.handleClose}
                        autoHideDuration={4000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snacktext}</span>}
                        />
                </div>
                {/* <Divider style={{marginTop: '1em'}}/> */}
                <div style={{flexGrow: 1}}>
                    <TextField
                        id="standard-select-col-x"
                        select
                        label="X axis"
                        className={classes.textField}
                        value={this.state.col_x}
                        {...buttonsDisabled}
                        variant="outlined"
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
                        {...buttonsDisabled}
                        className={classes.textField}
                        value={this.state.col_y}
                        variant="outlined"
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
                        {...buttonsDisabled}
                        className={classes.button}
                        onClick={this.handlePlot}>
                        Plot
                    </Button>
                </div>
                </div>
                <div style={{marginTop: '2em'}}>
                     {this.state.plot === 1 && <Graph col_x={this.state.col_x} col_y={this.state.col_y} />}
                </div>
            </div>
        )
    };
}

DropdownDashBoard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(DropdownDashBoard);