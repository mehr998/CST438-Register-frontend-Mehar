import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';    
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {SERVER_URL} from '../constants.js'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


  class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { student: {name: '', email: ''} };
  } 

  //Add Student
  addStudent = () => { 
    const token = Cookies.get('XSRF-TOKEN');
    const student = this.state.student; //fixed
      
	console.log(student);
    fetch(`${SERVER_URL}/addingstudent`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json',
                   'X-XSRF-TOKEN': token  }, 
        body: JSON.stringify(student)
      })
    .then(res => {
        if (res.ok) {
          toast.success("Student was added!", {
              position: toast.POSITION.TOP_CENTER
          });
        } else {
          toast.error("Something went wrong!", {
              position: toast.POSITION.TOP_CENTER
          });
          console.error('Post http status =' + res.status);
        }})
    .catch(err => {
      toast.error("Something went wrong!", {
            position: toast.POSITION.TOP_CENTER
        });
        console.error(err);
    })
  } 

    handleChange1 = (e) => {
       var temp= this.state.student;
	   temp.name = e.target.value;
	   this.setState({student: temp}) 
    }

	handleChange2 = (e) => {
       var temp2 = this.state.student;
	   temp2.email = e.target.value;
	   this.setState({student: temp2}) 
    }

  render() {

  return(
		<div>
		<AppBar position="static" color="default">
		    <Toolbar>
               <Typography variant="h6" color="primary">{'Adding student...'}</Typography>
            </Toolbar>
		</AppBar>
		<div className="App">
            <div style={{width:'100%'}}>
            </div>
			    <Grid container spacing={5} justifyContent="left" alignItems="center" paddingTop={10}>
			        <Grid item><TextField autoFocus fullWidth variant="filled" label="Student name" name="name" onBlur={this.handleChange1}/></Grid>
			
                    <Grid item><TextField fullWidth variant="filled" label="Student email" name="email" onBlur={this.handleChange2}/></Grid>
                    
                    <Button color="primary" variant="contained" onClick={this.addStudent}>Add</Button>
			    </Grid>
			</div>
		</div>
    ); 
  }
}

export default AddStudent;