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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ViewAssignmentPopup from './ViewAssignmentPopup';
import AssignmentPopup from './AssignmentPopup';
import ConfirmationDialog from '../Components/ConfirmationDialog';

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

const test_data = [
  [0, 'Assignment 1', [0, 1, 2]],
  [1, 'Assignment 2', [0, 2, 1]],
  [2, 'Assignment 3', [2, 1, 0]],
];

function createData(i, name, questions) {
  return { i, name, questions };
}

const rows = []

for (let i = 0; i < test_data.length; i += 1) {
  rows.push(createData(...test_data[i]));
}

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

  //delete dialog actions
  const [openDelete, setOpenDelete] = useState(false);
  
  const handleClickDelete = () => {
    setOpenDelete(true);
  };
  const handleDialogResult = (continueAction) => {
    setOpenDelete(false);
    if (continueAction) {
        //complete action
    }
  };

  return (
    <React.Fragment>
    <TableRow hover role="checkbox" tabIndex={-1} key={row.i} >
      <TableCell onClick={handleCLickRow}>{row.name}</TableCell>
      <TableCell onClick={handleCLickRow} align="right">{row.i}</TableCell>
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
        />
        )}

      <TableCell align="right">
        <IconButton aria-label="expand row" size="small" onClick={handleClickDelete}>
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

export default function AssignmentTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}