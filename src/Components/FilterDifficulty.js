import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 1800,
    margin: 'auto',
    paddingBottom: theme.spacing(1.5),
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

//for difficulty:
const difficultyFilters = [
    { title: 'Easy' },
    { title: 'Medium' },
    { title: 'Hard' },
  ];

export default function FilterQuestions(props) {
  const classes = useStyles();
  const { parentCallback } = props;

  const [filter, setFilter] = useState([]);

  const setFilterHandler = (event, newFilter) => {
    let filterArray = [];
    newFilter.map((oneFilter) => filterArray.push(oneFilter.title));
    setFilter(filterArray);
    parentCallback(filterArray);
  };

  return (
    <div className={classes.root}>
     
      
        <Autocomplete
          multiple
          onChange={setFilterHandler}
          id="filter-dropdown"
          options={difficultyFilters}
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
          style={{ width: '80%' }}
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

    </div>
  );
}