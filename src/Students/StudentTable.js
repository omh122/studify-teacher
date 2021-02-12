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
  { id: 'delete_icon', label: ' ' },
];

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
    <TableRow tabIndex={-1} key={row.i} >
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.group}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="expand row" size="small" onClick={handleClickDelete}>
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

export default function AssignmentTable() {
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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