import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  paddedItem:{
    padding: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const test_data = [
    [0, 'Assignment 1', [0, 1, 2]],
    [1, 'Assignment 2', [0, 2, 1]],
    [2, 'Assignment 3', [2, 1, 0]],
  ];

function createData(i, name, questions) {
  return { i, name, questions };
}

const assignments = []

for (let i = 0; i < test_data.length; i += 1) {
  assignments.push(createData(...test_data[i]));
}

function Home() {
  const classes = useStyles();

  const [assignment, setAssignment] = useState('');

  const handleChange = (event) => {
    setAssignment(event.target.value);
  };

  return (
    <div className={classes.paddedItem}>
        <FormControl>
        <InputLabel className={classes.textField} id="demo-simple-select-label">Select Assignment</InputLabel>
        <Select className={classes.textField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={assignment}
            onChange={handleChange}
        >
            {assignments.map((option) => (
              <MenuItem value={option.name}>{option.name}</MenuItem>
            ))}
        </Select>
        </FormControl>
    </div>
  );
}

export default Home;