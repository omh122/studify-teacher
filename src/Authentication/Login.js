import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  paddedItem: {
    paddingTop: theme.spacing(5),
  },
  whiteText: {
    color: "#ffffff",
  },
  root: {
    backgroundColor: '#514663',
  },
  paper: {
    backgroundColor: '#ffffff',
    width: 300,
    height: 300,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const redirect = () => {
    history.push('/home');
  };

  const handleClose = () => {
    setOpen(false);
    redirect();
  };

  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <DialogContent className={classes.root}>
          <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                display='flex'
                style={{ minHeight: '90vh' }}
               >
            <Grid item xs={12} className={classes.whiteText} ><Typography variant="h1">Studify</Typography></Grid>
            <Grid item xs={12} className={classes.whiteText} ><Typography variant="h5">for teachers</Typography></Grid>
            <Grid item xs={12} className={classes.paddedItem}>
            <Paper className={classes.paper}>
              <Grid container spacing={3} align='center' justify='center'>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      value={values.username}
                      onChange={handleChange('username')}
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} >
                  <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleClose} disabled={values.username===''|values.password===''}>Login</Button>
                </Grid>
              </Grid>
            </Paper>
            </Grid>
          </Grid>
          
        </DialogContent>

      </Dialog>
    </div>
  );
}
