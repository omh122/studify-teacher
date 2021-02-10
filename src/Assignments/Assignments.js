import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTable from './AssignmentTable';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../Components/SearchBar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(5),
  },
}));
function Questions() {
  const classes = useStyles();

  function handleClickOpen() {
    //todo
  }

  return (
    <div>
        <Typography  className={classes.paddedItem} variant="h3">
          Assignments
        </Typography>
        
        <Grid container spacing={2} className={classes.paddedItem} alignItems="center" justify="center">
            <Grid item xs={4}>
            <SearchBar />
            </Grid>
            <Grid item xs={7}>
            
            </Grid>
            <Grid item xs={1}>
            <IconButton aria-label="add" onClick={handleClickOpen}>
              <AddIcon fontSize="large"/>
            </IconButton>
            </Grid>
            <Grid item xs={12}>
            <AssignmentTable />
            </Grid>
        </Grid>
    </div>
  );
}

export default Questions;