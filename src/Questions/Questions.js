import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import QuestionTable from './QuestionTable';
import Grid from '@material-ui/core/Grid';
import SearchBar from './SearchBar';
import Filter from './Filter';

const useStyles = makeStyles((theme) => ({
  paddedItem:{
    padding: theme.spacing(3)
  },
  table:{
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(5),
  }
}));
function Questions() {
  const classes = useStyles();

  function setFilterViews() {
    //todo
  }

  return (
    <div>
        <Typography  className={classes.paddedItem} variant="h3">
          Question Bank
        </Typography>
        
        <Grid container spacing={5} className={classes.table} alignItems="center" justify="center">
            <Grid item xs={5}>
            <SearchBar />
            </Grid>
            <Grid item xs={7}>
            <Filter parentCallback={setFilterViews} />
            </Grid>
            <Grid item xs={12}>
            <QuestionTable />
            </Grid>
        </Grid>
    </div>
  );
}

export default Questions;