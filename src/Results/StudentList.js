import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FilterStudents from '../Components/FilterStudents';
import studentService from '../services/students';
import { trackPromise } from 'react-promise-tracker';

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

  // fetch student data
  const [studentBank, setStudentBank] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await trackPromise(studentService.getStudents());
      setStudentBank(res.data.sort((a, b) => (a.name > b.name) ? 1 : -1));
    }
    fetchData();
  }, []);

  // filter actions
  const [filterGroup, setFilterGroup] = useState([]);

  function setFilterViewsGroup(settingsData) {
    setFilterGroup(settingsData);
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
          <FilterStudents parentCallback={setFilterViewsGroup}/>
        </Grid>
        <Grid item xs={12} align='center' justify='center'>
          <Paper className={classes.root}>
          <List dense component="nav" role="list">
              {filterGroup.length === 0 ? 
                studentBank.map((student) => {
                return (
                    <ListItem button key={student.matricNo} selected={selectedIndex === student.matricNo} onClick={(event) => handleListItemClick(event, student.matricNo)} >
                    <ListItemText id={student.matricNo} primary={student.name} secondary={student.matricNo + '    ' + student.tutorialGrp}/>
                    </ListItem>
                );}) : 
                studentBank.filter((student) => filterGroup.includes(student.tutorialGrp)).map((student) => {
                return (
                    <ListItem button key={student.matricNo} selected={selectedIndex === student.matricNo} onClick={(event) => handleListItemClick(event, student.matricNo)} >
                    <ListItemText id={student.matricNo} primary={student.name} secondary={student.matricNo + '    ' + student.tutorialGrp}/>
                    </ListItem>
                );
                })
              }
              <ListItem />
          </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
