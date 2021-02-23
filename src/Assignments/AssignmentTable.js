import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ViewAssignmentPopup from './ViewAssignmentPopup';
import AssignmentPopup from './AssignmentPopup';
import ConfirmationDialog from '../Components/ConfirmationDialog';
import assignmentService from '../services/assignments';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Assignment', minWidth: 200 },
  {
    id: 'id',
    label: 'Code',
    minWidth: 100,
    align: 'right',
  },
  { id: 'edit_icon', label: ' ' },
  { id: 'delete_icon', label: ' ' },
  { id: 'share_icon', label: ' ' },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function Row(props) {
  const { row, questionbank } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [openAssignment, setopenAssignment] = useState(false);

  // view assignment dialog
  const handleCLickRow = () => {
    setopenAssignment(true);
  };
  const handleCloseRow = () => {
    setopenAssignment(false);
  };

  // edit dialog actions 
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

   // delete dialog actions
   const [selected, setSelected] = useState(false);
   const handleSelect = (assignment) => {
    setSelected(assignment);
   };
 
   const deleteAssignment = async (id) => {
     const res = await trackPromise(
      assignmentService.deleteAssignment(id)
     );
     if (res.status === 201) {
       history.go(0);
     }
   };
 
   const [openDelete, setOpenDelete] = useState(false);
   const handleClickDelete = (assignment) => {
    handleSelect(assignment);
     setOpenDelete(true);
   };
   const handleDialogResult = (continueAction) => {
     setOpenDelete(false);
     if (continueAction) {
      deleteAssignment(selected._id);
     }
   };

  return (
    <React.Fragment>
    <TableRow hover role="checkbox" tabIndex={-1} key={row._id} >
      <TableCell onClick={handleCLickRow}>{row.name}</TableCell>
      <TableCell onClick={handleCLickRow} align="right">{row._id}</TableCell>
      {openAssignment && (
        <ViewAssignmentPopup assignment={row} parentCallback={handleCloseRow} />
      )}
      <TableCell align="right">
        <IconButton aria-label="expand row" size="small" onClick={handleClickEdit}>
          <EditIcon />
        </IconButton>
      </TableCell>
      {openEdit && (
        <AssignmentPopup
          //callback
          parentCallback={handleCloseEdit}
          type="edit"
          assignment={row}
          questionbank={questionbank}
        />
        )}

      <TableCell align="right">
        <IconButton aria-label="expand row" size="small" onClick={()=>handleClickDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
      {openDelete && (
        <ConfirmationDialog
          //callback
          title={"Delete Assignment"}
          content={"Confirm deletion of this assignment? This action cannot be undone."}
          parentCallback={handleDialogResult}
        />
      )}
      <TableCell align="right">
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          <ShareIcon />
        </IconButton>
      </TableCell>
    </TableRow>
    </React.Fragment>
  )
};

export default function AssignmentTable(props) {
  const classes = useStyles();

  const { assignments, questionbank } = props;

  // useEffect(() => {
  //   for (let i = 0; i < assignments.length; i += 1) {
  //     rows.push(createData(...assignments[i]));
  //   }
  // }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,
                           backgroundColor: '#C78283',
                           color: "#fff"      
                         }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((assignment) => (
              <Row key={assignment.name} row={assignment} questionbank={questionbank}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={assignments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}