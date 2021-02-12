import React from 'react';
import Graph from './Graph';
import { makeStyles } from '@material-ui/core/styles';
import SelectAssignment from './SelectAssignment';
import Grid from '@material-ui/core/Grid';
import StudentList from './StudentList';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
    // paddingTop: theme.spacing(5),
  },
}));
function Home() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3} className={classes.paddedItem}>
        <Grid item xs={12} align='center'>
          <SelectAssignment />
        </Grid>
        <Grid item xs={3}>
          <StudentList />
        </Grid>
        <Grid item xs={9} align='center' justify='center'>
          <Graph />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;