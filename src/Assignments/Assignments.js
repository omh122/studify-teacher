import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTable from './AssignmentTable';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../Components/SearchBar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AssignmentPopup from './AssignmentPopup';
import assignmentService from '../services/assignments';
import { trackPromise } from 'react-promise-tracker';
import questionService from '../services/questions';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(5),
  },
}));
function Assignments() {
  const classes = useStyles();

  // add assignment dialog 
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // fetch assignment data
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await trackPromise(assignmentService.getAssignments());
      setAssignments(res.data);
    }
    fetchData();
  }, []);

  // fetch question bank data
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await trackPromise(questionService.getQuestions());
      setQuestions(res.data);
    }
    fetchData();
  }, []);

  return (
    <div>
        <Typography  className={classes.paddedItem} variant="h3">
          Assignments
        </Typography>
        
        <Grid container spacing={2} className={classes.paddedItem} alignItems="center" justify="center">
            <Grid item xs={5}>
            <SearchBar />
            </Grid>
            <Grid item xs={6}> </Grid>
            <Grid item xs={1}>
            <Fab aria-label="add" onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            </Grid>
            <Grid item xs={12}>
            <AssignmentTable assignments={assignments} questionbank={questions}/>
            </Grid>
        </Grid>

        {open && (
        <AssignmentPopup
          //callback
          parentCallback={handleClose}
          type="add"
          questionbank={questions}
        />
        )}

    </div>
  );
}

export default Assignments;