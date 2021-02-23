import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { DialogActions } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import studentService from '../services/students';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  actionButton: {
    display: 'inline-block',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  form: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paddedtop: {
    marginTop: theme.spacing(3),
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    position: 'relative',
    margin: theme.spacing(3),
    // padding: theme.spacing(3),
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    // maxHeight: '60vh',
    overflowY: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    root: {
      // backgroundColor: 'pink',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      // backgroundColor: 'orange',
      maxWidth: 'lg',
    },
  },
}))(MuiDialogContent);

export default function StudentPopup(props) {
  const { parentCallback, type } = props;
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState({
    name: '',
    matricNo: '',
    tutorialGrp: '',
    username: 'default',
    password: 'default',
    id: '',
  });


  //DIALOG ACTIONS
  const handleClose = () => {
    parentCallback();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newStudent = {
      "name": values.name,
      "matricNo": values.matricNo,
      "tutorialGrp": values.tutorialGrp,
      "username": values.username,
      "password": values.password,
    }

    let res;
    if (type === 'add') {
      res = await trackPromise(studentService.addStudent(newStudent));
    } else if (type === 'edit') {
      res = await trackPromise(studentService.updateStudent(values.id, newStudent));
    }
    console.log(res.status);
    if (res.status === 201) {
      history.go(0);
      handleClose();
    } else {
      alert("Error :(");
    }
    
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="signup popup"
        open={true}
        className={classes.root}
        maxWidth="md" //or "lg"
        scroll="body"
        marginBottom="5"
      >
        <DialogTitle id="studentPopup">
          Add New Student
        </DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <FormControl fullWidth className={classes.form} variant="outlined">
                <InputLabel htmlFor="question-input">Student Name</InputLabel>
                <Input
                  id="name-input"
                  value={values.name}
                  onChange={handleChange('name')}
                  labelWidth={60}
                />
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth className={classes.form} variant="outlined">
                <InputLabel htmlFor="question-input">Matric Number</InputLabel>
                <Input
                  id="id-input"
                  value={values.matricNo}
                  onChange={handleChange('matricNo')}
                  labelWidth={60}
                />
              </FormControl>
              </Grid>
              <Grid item xs={12}>
              <FormControl fullWidth className={classes.form}>
                <InputLabel id="demo-simple-select-label">Tutorial Group</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.tutorialGrp}
                  onChange={handleChange('tutorialGrp')}
                >
                  <MenuItem value={'SSP1'}>SSP1</MenuItem>
                  <MenuItem value={'SSP2'}>SSP2</MenuItem>
                  <MenuItem value={'SSP3'}>SSP3</MenuItem>
                  <MenuItem value={'SSP4'}>SSP4</MenuItem>
                </Select>
              </FormControl>
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={classes.actionButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={classes.actionButton} variant="contained" color="secondary" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}