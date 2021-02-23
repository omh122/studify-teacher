import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import QuestionTable from './QuestionTable';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../Components/SearchBar';
import Filter from '../Components/Filter';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import QuestionPopup from './QuestionPopup';
import questionService from '../services/questions';
import { trackPromise } from 'react-promise-tracker';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(5),
  },
}));

function Questions() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function setFilterViews() {
    //todo
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [questions, setQuestions] = useState([]);

  // fetch data
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
          Question Bank
        </Typography>
        
        <Grid container spacing={2} className={classes.paddedItem} alignItems="center" justify="center">
            <Grid item xs={4}>
            <SearchBar />
            </Grid>
            <Grid item xs={7}>
            <Filter parentCallback={setFilterViews} />
            </Grid>
            <Grid item xs={1}>
            <Fab aria-label="add" onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            </Grid>
            <Grid item xs={12}>
            <QuestionTable questions={questions}/>
            </Grid>
        </Grid>

        {open && (
        <QuestionPopup
          //callback
          parentCallback={handleClose}
          type="add"
        />
        )}

    </div>
  );
}

export default Questions;