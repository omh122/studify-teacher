import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { DialogActions } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
  root: {
    // position: 'relative',
    margin: theme.spacing(3),
    padding: theme.spacing(3),
  },
  actionButton: {
    display: 'inline-block',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  paddedTop: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    height: '100%',
    padding: theme.spacing(1),
    // overflow: 'auto',
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    position: 'relative',
    margin: theme.spacing(3),
    // padding: theme.spacing(3),
    border: 'none',
    display: 'flex',
    // alignItems: 'center',
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

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
    <TableRow tabIndex={-1} key={row.i} >
      <TableCell>
      </TableCell>
      <TableCell>{row.question}</TableCell>
    </TableRow>
    <TableRow >
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}> 
          <Box marginLeft={16} margin={1}>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {row.options.map((option) => (
                  <TableRow key={option}>
                    <TableCell component="th" scope="row">
                      {option}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {row.answer===option && <CheckIcon/>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>  
          </Box>
      </TableCell>
    </TableRow>
    </React.Fragment>
  )
};

export default function ViewAssignmentPopup(props) {
  const { assignment, parentCallback } = props;
  const classes = useStyles();

    // // setting questions for the assignment
    // const [qns, setQns] = useState([]);

    // const setQnData = () => {
    //   for (let i = 0; i < assignment.questions.length; i += 1) {
    //     setQns((qns) => [...qns, rows[assignment.questions[i]]]);
    //   }
    // };

    // useEffect(() => {
    //   setQnData();
    // }, []);

  //DIALOG ACTIONS
  const handleClose = () => {
    parentCallback();
  };

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
          {assignment.name}
        </DialogTitle>
        <DialogContent dividers>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table" >
              <TableBody>
                {assignment.questions.map((row) => (
                  <Row key={row.question} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        </DialogContent>
        <DialogActions>
          <Button className={classes.actionButton} variant="contained" color="secondary" onClick={handleClose}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}