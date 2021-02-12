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
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Box from '@material-ui/core/Box';
import QuestionPopup from './QuestionPopup';
import ConfirmationDialog from '../Components/ConfirmationDialog';


const columns = [
  { id: 'expand_icon', label: ' ' },
  { id: 'question', label: 'Question', minWidth: 200 },
  {
    id: 'category',
    label: 'Category',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'difficulty',
    label: 'Difficulty',
    minWidth: 100,
    align: 'right',
  },
  { id: 'edit_icon', label: ' ' },
  { id: 'delete_icon', label: ' ' },
];

const test_data = [
  [0, 'What is the name of this course?', 'Introduction', 'Easy', ['CZ3001', 'CZ3002', 'CZ3003', 'CZ3004'], 'CZ3003'],
  [1, 'What is the name of this game?', 'Introduction', 'Medium', ['Studify', 'Study Game', 'Minesweeper', 'Poker'], 'Studify'],
  [2, 'What is the name of the course coordinatpr?', 'Introduction', 'Hard', ['Chuan Bin', 'Gang Zhe', 'Xiaoqing', 'Min Hui'], 'Xiaoqing'],
];

function createData(i, question, category, difficulty, options, answer) {
  return { i, question, category, difficulty, options, answer };
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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  //edit dialog actions
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

  const classes = useRowStyles();

  return (
    <React.Fragment>
    <TableRow tabIndex={-1} key={row.i} >
      <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell>{row.question}</TableCell>
      <TableCell align="right">{row.category}</TableCell>
      <TableCell align="right">{row.difficulty}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="expand row" size="small" onClick={handleClickEdit}>
          <EditIcon />
        </IconButton>
      </TableCell>
      {openEdit && (
        <QuestionPopup
          //callback
          parentCallback={handleCloseEdit}
          type="edit"
          row={row}
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
          title={"Delete Question"}
          content={"Confirm deletion of this question? This action cannot be undone."}
          parentCallback={handleDialogResult}
        />
      )}
    </TableRow>
    <TableRow className={classes.root}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}> 
        <Collapse in={open} timeout="auto" unmountOnExit>
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
        </Collapse>
      </TableCell>
    </TableRow>
    </React.Fragment>
  )
};

export default function QuestionTable() {
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
                           backgroundColor: '#7698B3',
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