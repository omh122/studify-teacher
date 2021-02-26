import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StudentTable from './StudentTable';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../Components/SearchBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import StudentPopup from './StudentPopup';
import studentService from '../services/students';
import { trackPromise } from 'react-promise-tracker';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(5),
  },
}));
function Students() {
  const classes = useStyles();

  // add student dialog 
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // fetch student data
  const [studentBank, setStudentBank] = useState([]);

  // fetch data
  useEffect(() => {
    async function fetchData() {
      const res = await trackPromise(studentService.getStudents());
      setStudents(res.data);
      setStudentBank(res.data);
    }
    fetchData();
  }, []);

  // search actions
  const [input, setInput] = useState('');
  const [students, setStudents] = useState([]);

  const updateInput = async (input) => {
    const filtered = studentBank.filter(student => {
     return student.name.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setStudents(filtered);
 }

  return (
    <div>
        <Typography  className={classes.paddedItem} variant="h3">
          Students
        </Typography>
        
        <Grid container spacing={2} className={classes.paddedItem}>
            <Grid item xs={5}>
            <SearchBar query={input} setQuery={updateInput}/>
            </Grid>
            <Grid item xs={6}> </Grid>
            <Grid item xs={1}>
            <Fab aria-label="add" onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            </Grid>
            <Grid item xs={12}>
            <StudentTable students={students}/>
            </Grid>
        </Grid>

        {open && (
        <StudentPopup
          //callback
          parentCallback={handleClose}
          type="add"
        />
        )}

    </div>
  );
}

export default Students;