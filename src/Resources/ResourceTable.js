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
import Box from '@material-ui/core/Box';
import ResourcePopup from './ResourcePopup';
import ConfirmationDialog from '../Components/ConfirmationDialog';
import ResponsivePlayer from '../Components/ResponsivePlayer';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import resourceService from '../services/resources';
import { trackPromise } from 'react-promise-tracker';
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'expand_icon', label: ' ' },
  { id: 'name', label: 'Tutorial', minWidth: 200 },
  {
    id: 'category',
    label: 'Category',
    minWidth: 100,
  },
  // {
  //   id: 'difficulty',
  //   label: 'Difficulty',
  //   minWidth: 100,
  // },
  {
    id: 'url',
    label: 'URL',
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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
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
  const handleSelect = (resource) => {
    setSelected(resource);
  };

  const deleteResource = async (id) => {
    const res = await trackPromise(
      resourceService.deleteResource(id)
    );
    if (res.status === 201) {
      history.go(0);
    }
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleClickDelete = (resource) => {
    handleSelect(resource);
    setOpenDelete(true);
  };
  const handleDialogResult = (continueAction) => {
    setOpenDelete(false);
    if (continueAction) {
      deleteResource(selected._id);
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
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.category}</TableCell>
        {/* <TableCell>{row.difficulty}</TableCell> */}
        <TableCell>{row.url}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="expand row" size="small" onClick={handleClickEdit}>
            <EditIcon />
          </IconButton>
        </TableCell>
        {openEdit && (
          <ResourcePopup
            //callback
            parentCallback={handleCloseEdit}
            type="edit"
            row={row}
          />
        )}
        <TableCell align="right">
          <IconButton aria-label="expand row" size="small" onClick={() => handleClickDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        {openDelete && (
          <ConfirmationDialog
            //callback
            title={"Delete Resource"}
            content={"Confirm deletion of this resource? This action cannot be undone."}
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
                  <TableRow key={row.i} className={classes.root}>
                    <TableCell component="th" scope="row">
                      <ResponsivePlayer url={row.url} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
};

export default function ResourceTable(props) {
  const { resources } = props;
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
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#A3A152',
                    color: "#fff"
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((resource) => (
              <Row key={resource.name} row={resource} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={resources.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}