import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    position: 'relative',
  },
  iconButton: {
    padding: 0,
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const { searchCallback } = props;


  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={1} justify="flex-end">
          <IconButton
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item xs={11}>
          <TextField
            id="search-bar"
            label="Search Questions..."
            fullWidth
            variant="outlined"
            color="secondary"
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}