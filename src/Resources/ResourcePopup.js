import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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

export default function ResourcePopup(props) {
  const { parentCallback, type, row } = props;
  const classes = useStyles();
  const [values, setValues] = useState({
    name: typeof row !== 'undefined' ? row.name : '',
    category: typeof row !== 'undefined' ? row.category : '',
    difficulty: typeof row !== 'undefined' ? row.difficulty : '',
    url: typeof row !== 'undefined' ? row.url : '',
  });

  //DIALOG ACTIONS
  const handleClose = () => {
    parentCallback();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const addResource = (event) => {
   //todo
   parentCallback();

  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="resource popup"
        open={true}
        className={classes.root}
        fullWidth={true}
        maxWidth="md" //or "lg"
        scroll="body"
        marginBottom="5"
      >
        <DialogTitle id="resourcePopup">
          {type === 'add' ? 'Add New Resource' : 'Edit Resource'}
        </DialogTitle>
        <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <FormControl fullWidth className={classes.form} variant="outlined">
                <InputLabel htmlFor="name-input">Name</InputLabel>
                <Input
                  id="name-input"
                  value={values.name}
                  onChange={handleChange('name')}
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
                  <MenuItem value={'Analysis'}>Analysis</MenuItem>
                  <MenuItem value={'Design'}>Design</MenuItem>
                  <MenuItem value={'Implementation'}>Implementation</MenuItem>
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
              <FormControl fullWidth className={classes.form} variant="outlined">
                <InputLabel htmlFor="question-input">URL</InputLabel>
                <Input
                  id="question-input"
                  value={values.url}
                  onChange={handleChange('url')}
                  labelWidth={60}
                />
              </FormControl>
              </Grid>
            </Grid>  
        </DialogContent>
        <DialogActions>
          <Button className={classes.actionButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={classes.actionButton} variant="contained" color="secondary" onClick={addResource}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}