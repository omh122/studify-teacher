import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from '../Components/SearchBar';
import FilterCategory from '../Components/FilterCategory';
import FilterDifficulty from '../Components/FilterDifficulty';
import Grid from '@material-ui/core/Grid';
import ResourceTable from './ResourceTable';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ResourcePopup from './ResourcePopup';
import resourceService from '../services/resources';
import { trackPromise } from 'react-promise-tracker';

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // fetch resource data
  const [resourceBank, setResourceBank] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await trackPromise(resourceService.getResources());
      setResources(res.data);
      setResourceBank(res.data);
    }
    fetchData();
  }, []);

  // filter actions
  const [filterCat, setFilterCat] = useState([]);
  // const [filterDiff, setFilterDiff] = useState([]);

  function setFilterViewsCat(settingsData) {
    setFilterCat(settingsData);
  }

  // function setFilterViewsDiff(settingsData) {
  //   setFilterDiff(settingsData);
  // }

  // search actions
  const [input, setInput] = useState('');
  const [resources, setResources] = useState([]);

  const updateInput = async (input) => {
    const filtered = resourceBank.filter(resource => {
      return resource.name.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setResources(filtered);
  }

  return (
    <div>
      <Typography className={classes.paddedItem} variant="h3">
        Teaching Resources
        </Typography>

      <Grid container spacing={2} className={classes.paddedItem}>
        <Grid item xs={5}>
          <SearchBar query={input} setQuery={updateInput} />
        </Grid>
        {/* <Grid item xs={3}>
            <FilterDifficulty  parentCallback={setFilterViewsDiff} />
          </Grid> */}
        <Grid item xs={4}>
          <FilterCategory parentCallback={setFilterViewsCat} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={1}>
          <Fab aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <ResourceTable resources={
            // filterDiff.length === 0 ? 
            filterCat.length === 0 ?
              resources : resources.filter((resource) => filterCat.includes(resource.category))
            // filterCat.length === 0 ? 
            // resources.filter((resource) => filterDiff.includes(resource.difficulty)) : resources.filter((resource) => filterCat.includes(resource.category) && filterDiff.includes(resource.difficulty))  
          } />
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