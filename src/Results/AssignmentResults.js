import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// create animations https://www.youtube.com/watch?v=JcHLxzrsRS4 
const useStyles = makeStyles((theme) => ({
  paddedItem:{
    padding: theme.spacing(3)
  }
}));
function Home() {
  const classes = useStyles();
  return (
    <div>
        <Typography  className={classes.paddedItem} paragraph>
          This is a assignment results page
        </Typography>
    </div>
  );
}

export default Home;