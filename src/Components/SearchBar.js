import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '90%',
    maxWidth: 1500,
    margin: 'auto',
    paddingBottom: theme.spacing(1.5),
  },
  iconButton: {
    padding: 0,
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const { query, setQuery } = props;

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
            label="Search..."
            fullWidth
            variant="outlined"
            color="secondary"
            value={query}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}