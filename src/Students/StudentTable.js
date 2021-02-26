import React, { useState } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmationDialog from '../Components/ConfirmationDialog';
import studentService from '../services/students';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';
import StudentPopup from './StudentPopup';
import EditIcon from '@material-ui/icons/Edit';

const columns = [
  { id: 'name', label: 'Student', minWidth: 200 },
  {
    id: 'id',
    label: 'Matric Number',
    minWidth: 100,
  },
  {
    id: 'group',
    label: 'Tutorial Group',
    minWidth: 100,
  },
  {
    id: 'username',
    label: 'Username',
    minWidth: 100,
  },
  {
    id: 'password',
    label: 'Password',
    minWidth: 100,
  },
  { id: 'edit_icon', label: ' ' },
  { id: 'delete_icon', label: ' ' },
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
  const { row } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);

  //edit dialog actions
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // delete dialog actions
  const [selected, setSelected] = useState(false);
  const handleSelect = (student) => {
   setSelected(student);
  };

  const deleteStudent = async (id) => {
    const res = await trackPromise(
      studentService.deleteStudent(id)
    );
    if (res.status === 201) {
      history.go(0);
    }
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleClickDelete = (student) => {
   handleSelect(student);
    setOpenDelete(true);
  };
  const handleDialogResult = (continueAction) => {
    setOpenDelete(false);
    if (continueAction) {
      deleteStudent(selected._id);
    }
  };

  return (
    <React.Fragment>
    <TableRow tabIndex={-1} key={row.i} >
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.matricNo}</TableCell>
      <TableCell>{row.tutorialGrp}</TableCell>
      <TableCell>{row.username}</TableCell>
      <TableCell>{row.password}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="expand row" size="small" onClick={handleClickEdit}>
          <EditIcon />
        </IconButton>
      </TableCell>
      {openEdit && (
        <StudentPopup
          //callback
          parentCallback={handleCloseEdit}
          type="edit"
          row={row}
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
          title={"Delete Student"}
          content={"Confirm deletion of this student? This action cannot be undone."}
          parentCallback={handleDialogResult}
        />
      )}
    </TableRow>
    </React.Fragment>
  )
};

export default function StudentTable(props) {
  const { students } = props;
  const classes = useStyles();
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
                           backgroundColor: '#6F9283',
                           color: "#fff"      
                         }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
              <Row key={student.name} row={student} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}