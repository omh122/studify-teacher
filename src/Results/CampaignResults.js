import React from 'react';
import QuestionStats from './QuestionStats';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StudentList from './StudentList';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(15),
    paddingRight: theme.spacing(15),
    paddingTop: theme.spacing(7),
  },
}));
function Home() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3} className={classes.paddedItem}>
        <Grid item xs={3}>
          <StudentList />
        </Grid>
        <Grid item xs={9} align='center' justify='center'>
          {/* <QuestionStats /> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;