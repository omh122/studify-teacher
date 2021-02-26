import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import QuestionTable from './QuestionTable';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../Components/SearchBar';
import FilterCategory from '../Components/FilterCategory';
import FilterDifficulty from '../Components/FilterDifficulty';
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

  // search actions
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState([]);

  const updateInput = async (input) => {
    const filtered = questionBank.filter(qn => {
     return qn.question.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setQuestions(filtered);
 }

  // filter actions
  const [filterCat, setFilterCat] = useState([]);
  const [filterDiff, setFilterDiff] = useState([]);

  function setFilterViewsCat(settingsData) {
    setFilterCat(settingsData);
  }

  function setFilterViewsDiff(settingsData) {
    setFilterDiff(settingsData);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // fetch data
  const [questionBank, setQuestionBank] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const res = await trackPromise(questionService.getQuestions());
      setQuestionBank(res.data);
      setQuestions(res.data);
    }
    fetchData();
  }, []);

  return (
    <div>
        <Typography  className={classes.paddedItem} variant="h3">
          Question Bank
        </Typography>
        
        <Grid container spacing={2} className={classes.paddedItem}>
            <Grid item xs={4}>
            <SearchBar query={input} setQuery={updateInput}/>
            </Grid>
            <Grid item xs={3}>
            <FilterDifficulty  parentCallback={setFilterViewsDiff} />
            </Grid>
            <Grid item xs={4}>
            <FilterCategory parentCallback={setFilterViewsCat} />
            </Grid>
            <Grid item xs={1}>
            <Fab aria-label="add" onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            </Grid>
            <Grid item xs={12}>
            <QuestionTable questions={
              filterDiff.length === 0 ? 
                filterCat.length === 0 ? 
                  questions : questions.filter((question) => filterCat.includes(question.category)) : 
                filterCat.length === 0 ? 
              questions.filter((question) => filterDiff.includes(question.difficulty)) : questions.filter((question) => filterCat.includes(question.category) && filterDiff.includes(question.difficulty))  
            }/>
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