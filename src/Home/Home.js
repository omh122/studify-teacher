import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
          This is a home page
        </Typography>
    </div>
  );
}

export default Home;