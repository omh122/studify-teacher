import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../Components/SearchBar';
import Filter from '../Components/Filter';
import Grid from '@material-ui/core/Grid';
import ResourceTable from './ResourceTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ResourcePopup from './ResourcePopup';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(5),
  },
}));
function Resources() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  function setFilterViews() {
    //todo
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
            <Grid item xs={1}>
            <Fab aria-label="add" onClick={handleClickOpen}>
              <AddIcon />
            </Fab>
            </Grid>
            <Grid item xs={12}>
            <ResourceTable />
            </Grid>
        </Grid>
        
        {open && (
        <ResourcePopup
          //callback
          parentCallback={handleClose}
          type="add"
        />
        )}

    </div>
  );
}

export default Resources;