import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { DialogActions } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';
import questionService from '../services/questions';
import { trackPromise } from 'react-promise-tracker';


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  actionButton: {
    display: 'inline-block',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  form: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  paddedtop: {
    marginTop: theme.spacing(3),
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    position: 'relative',
    margin: theme.spacing(3),
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

export default function QuestionPopup(props) {
  const { parentCallback, type, row } = props;
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState({
    id: typeof row !== 'undefined' ? row._id : '',
    question: typeof row !== 'undefined' ? row.question : '',
    category: typeof row !== 'undefined' ? row.category : '',
    difficulty: typeof row !== 'undefined' ? row.difficulty : '',
    option1: typeof row !== 'undefined' ? row.options[0] : '',
    option2: typeof row !== 'undefined' ? row.options[1] : '',
    option3: typeof row !== 'undefined' ? row.options[2] : '',
    option4: typeof row !== 'undefined' ? row.options[3] : '',
  });

  const [answer, setAnswer] = useState(typeof row !== 'undefined' ? row.answer : '');

  const [selected1, setSelected1] = useState(typeof row !== 'undefined' ? (row.options[0]===row.answer ? true : false) : false);
  const [selected2, setSelected2] = useState(typeof row !== 'undefined' ? (row.options[1]===row.answer ? true : false) : false);
  const [selected3, setSelected3] = useState(typeof row !== 'undefined' ? (row.options[2]===row.answer ? true : false) : false);
  const [selected4, setSelected4] = useState(typeof row !== 'undefined' ? (row.options[3]===row.answer ? true : false) : false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newQn = {
      "question": values.question,
      "category": values.category,
      "difficulty": values.difficulty,
      "options":[
        values.option1,
        values.option2,
        values.option3,
        values.option4
      ],
      "answer": answer
    }

    let res;
    if (type === 'add') {
      res = await trackPromise(questionService.addQuestion(newQn));
    } else if (type === 'edit') {
      res = await trackPromise(questionService.updateQuestion(values.id, newQn));
    }
    console.log(res.status);
    if (res.status === 201) {
      history.go(0);
      handleClose();
    } else {
      alert("Error :(");
    }
    
  };

  //DIALOG ACTIONS
  const handleClose = () => {
    parentCallback();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //handle answer selection
  useEffect(() => {
    if (selected1) {
      setAnswer(values.option1);
     } 
  }, [selected1, values.option1]);

  useEffect(() => {
    if (selected2) {
      setAnswer(values.option2);
     } 
  }, [selected2, values.option2]);

  useEffect(() => {
    if (selected3) {
      setAnswer(values.option3);
     } 
  }, [selected3, values.option3]);

  useEffect(() => {
    if (selected4) {
      setAnswer(values.option4);
     } 
  }, [selected4, values.option4]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="signup popup"
        open={true}
        className={classes.root}
        fullWidth={true}
        maxWidth="md" //or "lg"
        scroll="body"
        marginBottom="5"
      >
        <DialogTitle id="questionPopup">
          {type === 'add' ? 'Add New Question' : 'Edit Question'}
        </DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <FormControl fullWidth className={classes.form} variant="outlined">
                <InputLabel htmlFor="question-input">Question</InputLabel>
                <Input
                  id="question-input"
                  value={values.question}
                  onChange={handleChange('question')}
                  labelWidth={60}
                />
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth className={classes.form}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.category}
                  onChange={handleChange('category')}
                >
                  <MenuItem value={'Introduction'}>Introduction</MenuItem>
                  <MenuItem value={'Requirement Engineering'}>Requirement Engineering</MenuItem>
                  <MenuItem value={'Software Design'}>Software Design</MenuItem>
                  <MenuItem value={'Software Verification'}>Software Verification</MenuItem>
                  <MenuItem value={'Software Maintenance'}>Software Maintenance</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={6}>
              <FormControl fullWidth className={classes.form}>
                <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.difficulty}
                  onChange={handleChange('difficulty')}
                >
                  <MenuItem value={'Easy'}>Easy</MenuItem>
                  <MenuItem value={'Medium'}>Medium</MenuItem>
                  <MenuItem value={'Hard'}>Hard</MenuItem>
                </Select>
              </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paddedtop} paragraph>
                  Enter the answer options below, and tick the correct answer.
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Grid container >
                  <Grid item xs={10}>
                  <FormControl fullWidth className={classes.form} variant="outlined">
                    <InputLabel htmlFor="question-input">Option 1</InputLabel>
                    <Input id="question-input" value={values.option1} onChange={handleChange('option1')} labelWidth={60}/>
                  </FormControl>
                  </Grid>
                  <Grid item xs={2} align='center' justify='center'>
                  <ToggleButton size="small" value='option1' selected={selected1} onChange={() => {setSelected1(!selected1); setSelected2(false); setSelected3(false); setSelected4(false);}}>
                    <CheckIcon />
                  </ToggleButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container >
                  <Grid item xs={10}>
                  <FormControl fullWidth className={classes.form} variant="outlined">
                    <InputLabel htmlFor="question-input">Option 2</InputLabel>
                    <Input id="question-input" value={values.option2} onChange={handleChange('option2')} labelWidth={60}/>
                  </FormControl>
                  </Grid>
                  <Grid item xs={2} align='center' justify='center'>
                  <ToggleButton size="small" value='option2' selected={selected2} onChange={() => {setSelected2(!selected2); setSelected1(false); setSelected3(false); setSelected4(false);}}>
                    <CheckIcon />
                  </ToggleButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container >
                  <Grid item xs={10}>
                  <FormControl fullWidth className={classes.form} variant="outlined">
                    <InputLabel htmlFor="question-input">Option 3</InputLabel>
                    <Input id="question-input" value={values.option3} onChange={handleChange('option3')} labelWidth={60}/>
                  </FormControl>
                  </Grid>
                  <Grid item xs={2} align='center' justify='center'>
                  <ToggleButton size="small" value='option3' selected={selected3} onChange={() => {setSelected3(!selected3); setSelected1(false); setSelected2(false); setSelected4(false);}}>
                    <CheckIcon />
                  </ToggleButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container >
                  <Grid item xs={10}>
                  <FormControl fullWidth className={classes.form} variant="outlined">
                    <InputLabel htmlFor="question-input">Option 4</InputLabel>
                    <Input id="question-input" value={values.option4} onChange={handleChange('option4')} labelWidth={60}/>
                  </FormControl>
                  </Grid>
                  <Grid item xs={2} align='center' justify='center'>
                  <ToggleButton size="small" value='option4' selected={selected4} onChange={() => {setSelected4(!selected4); setSelected1(false); setSelected2(false); setSelected3(false);}}>
                    <CheckIcon />
                  </ToggleButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>  
        </DialogContent>
        <DialogActions>
          <Button className={classes.actionButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={classes.actionButton} variant="contained" color="secondary" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}