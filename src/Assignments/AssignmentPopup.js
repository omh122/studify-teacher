import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { DialogActions } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FilterCategory from './FilterCategory';
import FilterDifficulty from './FilterDifficulty';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(3),
  },
  actionButton: {
    display: 'inline-block',
    marginRight: theme.spacing(2),
  },
  paddedTop: {
    paddingTop: theme.spacing(15),
  },
  paper: {
    width: 350,
    height: 265,
    overflow: 'auto',
  },
  para: {
    paddingRight: theme.spacing(5),
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    position: 'relative',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    // padding: theme.spacing(3),
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    // maxHeight: '60vh',
    overflowY: 'auto',
  },
  [theme.breakpoints.down('md')]: {
    root: {
      // backgroundColor: 'pink',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      // backgroundColor: 'orange',
      maxWidth: 'lg',
    },
  },
}))(MuiDialogContent);

const test_data = [
  [0, 'What is the name of this course?', 'Introduction', 'Easy', ['CZ3001', 'CZ3002', 'CZ3003', 'CZ3004'], 'CZ3003'],
  [1, 'What is the name of this game?', 'Introduction', 'Medium', ['Studify', 'Study Game', 'Minesweeper', 'Poker'], 'Studify'],
  [2, 'What is the name of the course coordinatpr?', 'Introduction', 'Hard', ['Chuan Bin', 'Gang Zhe', 'Xiaoqing', 'Min Hui'], 'Xiaoqing'],
];

function createData(i, question, category, difficulty, options, answer) {
  return { i, question, category, difficulty, options, answer };
}

const question_bank = []

for (let i = 0; i < test_data.length; i += 1) {
    question_bank.push(createData(...test_data[i]));
}

// question list function
function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

export default function ViewAssignmentPopup(props) {
  const { assignment, parentCallback, type } = props;
  const classes = useStyles();

  function setFilterViews() {
    //todo
  }

  // setting assignment values (name and array of qns)
  const [name, setName] = useState(
    typeof assignment !== 'undefined' ? assignment.name : '',
  );

  // setting questions for the assignment
  const [qns, setQns] = useState([]);

  const setQuestionData = () => {
    if(typeof assignment !== 'undefined') {
        for (let i = 0; i < assignment.questions.length; i += 1) {
            setQns((qns) => [...qns, question_bank[assignment.questions[i]]]);
        }
    } 
  };

  useEffect(() => {
    setQuestionData();
  }, []);

  //DIALOG ACTIONS
  const handleClose = () => {
    parentCallback();
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  // list of questions
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    setLeft(not(question_bank, qns));
    setRight(qns)
  }, [qns]);

  const handleRight = (value) => {
    setRight(right.concat([value]));
    setLeft(not(left, [value]));
  };

  const handleLeft = (value) => {
    setLeft(left.concat([value]));
    setRight(not(right, [value]));
  };

  const customList = (items, type) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItem key={value.i} role="listitem" button onClick={()=>{if(type==='left'){
                                                                            handleRight(value);
                                                                        } else {
                                                                            handleLeft(value);
                                                                        }}}>
              <ListItemText id={labelId} primary={value.question} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="assignment-popup"
        open={true}
        className={classes.root}
        // fullWidth={true}
        maxWidth="md" //or "lg"
        scroll="paper"
        marginBottom="5"
      >
        <DialogTitle id="assignmentPopup">
            {type === 'add' ? 'Add New Assignment' : 'Edit Assignment'}
        </DialogTitle>
        <DialogContent dividers>
        <Grid container spacing={3} justify="center" alignItems="center" className={classes.root}>
        <Grid item xs={5}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="name-input">Assignment Name</InputLabel>
            <Input id="name-input" value={name} onChange={handleChange} labelWidth={60}/>
          </FormControl>
        </Grid>
        <Grid item xs={7}></Grid>
        <Grid item xs={6}>
            <Typography variant="h6"> <b>Question Bank</b></Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="h6"> <b>Assignment Questions</b></Typography>
        </Grid>
        <Grid item xs={6} className={classes.filter}>
          <FilterCategory parentCallback={setFilterViews}/>
          <FilterDifficulty parentCallback={setFilterViews}/>
        </Grid>
        <Grid item xs={6}>
            <Typography paragraph className={classes.para}> Click on the questions on the left to add to the assignment. To remove, click on the question on the right.</Typography>
        </Grid>
        <Grid item xs={6}>{customList(left, 'left')}</Grid>
        <Grid item xs={6}>{customList(right, 'right')}</Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button className={classes.actionButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={classes.actionButton} variant="contained" color="secondary" onClick={handleClose}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}