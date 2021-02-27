import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
  paddedItem:{
    padding: theme.spacing(3)
  },
  paddedTop:{
    paddingTop: theme.spacing(10)
  },
}));
function Home() {
  const classes = useStyles();

  return (
    <div>
      <Slide direction="down" in={true} mountOnEnter timeout={1500}>
        <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                display='flex'
                className={classes.paddedTop}
               >
            <Grid item xs={12} ><Typography variant="h4">Hi Teacher!</Typography></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} ><Typography variant="h2">Welcome to Studify</Typography></Grid>  
            {/* <Grid item xs={12} className={classes.paddedItem}>
              <ReactPlayer url="https://youtu.be/BROHvCSKr0Y" playing muted loop/>
            </Grid> */}
          </Grid>
        </Slide>
        <Slide direction="up" in={true} mountOnEnter timeout={1500}>
          <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                display='flex'
               >
            <Grid item xs={12} className={classes.paddedItem}>
              <ReactPlayer url="https://youtu.be/BROHvCSKr0Y" playing muted loop/>
            </Grid>
          </Grid>
        </Slide>
      </div>
  );
}

export default Home;