import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../Components/SearchBar';
import Filter from '../Components/Filter';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(5),
  },
}));
function Resources() {
  const classes = useStyles();

  function setFilterViews() {
    //todo
  }

  return (
    <div>
        <Typography  className={classes.paddedItem} variant="h3">
          Teaching Resources
        </Typography>

        <Grid container spacing={2} className={classes.paddedItem} alignItems="center" justify="center">
            <Grid item xs={4}>
            <SearchBar />
            </Grid>
            <Grid item xs={7}>
            <Filter parentCallback={setFilterViews} />
            </Grid>
        </Grid>
        
    </div>
  );
}

export default Resources;