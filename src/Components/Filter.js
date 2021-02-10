import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '80%',
    maxWidth: 1500,
    margin: 'auto',
  },
  text: {
    // padding: theme.spacing(2),
    // textAlign: 'center',
    textTransform: 'uppercase',
    margin: '0',
    color: theme.palette.text.secondary,
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      width: '90%',
    },
    section: {
      justifyContent: 'flex-start',
    },
  },
}));

//for filter
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//for category:
const categoryFilters = [
  { title: 'Introduction', filterType: 'category' },
  { title: 'Analysis', filterType: 'category' },
  { title: 'Design', filterType: 'category' },
  { title: 'Implementation', filterType: 'category' },
];

//for difficulty:
const difficultyFilters = [
    { title: 'Easy', filterType: 'difficulty' },
    { title: 'Medium', filterType: 'difficulty' },
    { title: 'Hard', filterType: 'difficulty' },
  ];

export default function FilterQuestions(props) {
  const classes = useStyles();
  const { parentCallback } = props;

  const [filter, setFilter] = useState([]);
  const [sort, setSort] = useState(false);

  const setFilterHandler = (event, newFilter) => {
    let filterArray = [];
    newFilter.map((oneFilter) => filterArray.push(oneFilter.title));
    setFilter(filterArray);
    parentCallback([filterArray, sort]);
  };

  const setSortHandler = (event) => {
    if (event.target.value !== sort) {
      var newSort = event.target.value;
      setSort(newSort);
      parentCallback([filter, newSort]);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="space-evenly">
        <Grid
          container
          item
          xs={12}
          sm={6}
          spacing={3}
          justify="flex-start"
          className={`${classes.section} ${classes.firstSection}`}
        >
          <Grid item align="center">
          </Grid>
          <Autocomplete
            multiple
            onChange={setFilterHandler}
            id="filter-dropdown"
            options={categoryFilters}
            groupBy={(option) => option.filterType}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </React.Fragment>
            )}
            style={{ width: '70%' }}
            // fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Category"
                placeholder="Select category(s)"
                color="secondary"
              />
            )}
          />
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={6}
          spacing={3}
          justify="flex-start"
          className={`${classes.section} ${classes.firstSection}`}
        >
          <Grid item align="center">
          </Grid>
          <Autocomplete
            multiple
            onChange={setFilterHandler}
            id="filter-dropdown"
            options={difficultyFilters}
            groupBy={(option) => option.filterType}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.title}
              </React.Fragment>
            )}
            style={{ width: '70%' }}
            // fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Difficulty"
                placeholder="Select difficulty(s)"
                color="secondary"
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}