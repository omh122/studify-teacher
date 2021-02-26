import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FilterStudents from '../Components/FilterStudents';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    margin: 'auto',
  },
}));

const test_data = [
    ['Wong Xiaoqing', 'U1822123C', 'SSP1'],
    ['Ooi Min Hui', 'U1822023F', 'SSP2'],
    ['Phoe Chuan Bin', 'U1822345A', 'SSP3'],
    ['Chen Gangzhe', 'U1822146B', 'SSP4'],
    ['Deng Jinyang', 'U1822143D', 'SSP1'],
    ['Wong Wei Jie', 'U1822423E', 'SSP2'],
    ['Derry Tan', 'U1822521A', 'SSP3'],
    ['Ng Jiayu', 'U1822301A', 'SSP4'],
    ['Tan Tan', 'U1821002C', 'SSP1'],
    ['Milky', 'U1821922D', 'SSP2'],
    ['Boki', 'U1820141A', 'SSP3'],
  ];

function createData(name, id, group) {
    return { name, id, group };
}

const students = []

for (let i = 0; i < test_data.length; i += 1) {
    students.push(createData(...test_data[i]));
}

export default function StudentList() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState('');

  const handleListItemClick = (event, index) => {
    if (selectedIndex===index) {
        setSelectedIndex('');
    } else {
        setSelectedIndex(index);
    }
    
  };

  function setFilterViews() {
    //todo
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Student List
          </Typography>
        </Grid>
        <Grid item xs={12} align='center' justify='center'>
          <FilterStudents parentCallback={setFilterViews}/>
        </Grid>
        <Grid item xs={12} align='center' justify='center'>
          <Paper className={classes.root}>
          <List dense component="nav" role="list">
              {students.map((student) => {
              const labelId = `transfer-list-item-${student.name}-label`;
              return (
                  <ListItem button key={student.id} selected={selectedIndex === student.id} onClick={(event) => handleListItemClick(event, student.id)} >
                  <ListItemText id={student.id} primary={student.name} secondary={student.id + '    ' + student.group}/>
                  </ListItem>
              );
              })}
              <ListItem />
          </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
