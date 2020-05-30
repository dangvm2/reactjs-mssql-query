import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';
import SendIcon from '@material-ui/icons/Send';
import { useSelector, useDispatch } from 'react-redux';
import { selectStatement, deleteStatement, runQuery } from '../redux/actions/dbaAction'
import { useHistory } from 'react-router';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Select All' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const handleDeleteClick = (e, props) => {
    let newArr = props.arrMultipleQuery.filter((obj, index) => {
      return !props.arrSelected.some((value) => { return value === index })
    })

    props.dispatch(deleteStatement(newArr));
  }

  const handleRunClick = (e, props) => {

    let strRun = "";

    for (const item of props.arrMultipleQuery) {
      if (props.arrSelected.some((f) => { return f === props.arrMultipleQuery.indexOf(item) })) {
        strRun = strRun.concat(item.name + ";");
      }
    }

    if (strRun !== "") {
      props.dispatch(runQuery(strRun, props.history));
    }
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Run multiple statement
          </Typography>
        )}

      {numSelected > 0 ? (
        <Toolbar>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={(e) => handleDeleteClick(e, props)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Run">
            <IconButton aria-label="run" onClick={(e => handleRunClick(e, props))}>
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Toolbar >
      ) : (
          null
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function ExecuteList() {
  const classes = useStyles();
  let history = useHistory();

  const arrMultipleQuery = useSelector(state => state.dbaReducer.arrMultipleQuery);
  const arrSelected = useSelector(state => state.dbaReducer.arrSelected);
  const dispatch = useDispatch();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = arrMultipleQuery.map((n, index) => index);
      // setSelected(newSelecteds);
      dispatch(selectStatement(newSelecteds));
      return;
    }
    // setSelected([]);
    dispatch(selectStatement([]));
  };

  const handleRowClick = (event, indexSelect) => {
    let arrClone = [...arrSelected];

    let newSelected = [];

    if (arrClone.includes(indexSelect)) {
      let index = arrClone.indexOf(indexSelect);
      arrClone.splice(index, 1)
      newSelected = newSelected.concat(arrClone);
    } else {
      newSelected = newSelected.concat(arrClone, indexSelect)
    }

    // setSelected(newSelected);

    dispatch(selectStatement(newSelected));
  };

  const isSelected = (index) => arrSelected.includes(index);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={arrSelected.length} arrSelected={arrSelected}
          arrMultipleQuery={arrMultipleQuery} dispatch={dispatch} history={history} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={arrSelected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={arrMultipleQuery.length}
            />
            <TableBody>
              {arrMultipleQuery.map((row, index) => {
                const isItemSelected = isSelected(index);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleRowClick(event, index)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow style={{ height: 53 }}>
                <TableCell colSpan={6} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
