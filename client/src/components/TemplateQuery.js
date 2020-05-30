import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';
import SelectColumn from './SelectColumn';
import { useSelector, useDispatch } from 'react-redux';
import { addTemplateSelect, inputValueWhere, inputValueSet, runQuery, showSnackBar } from '../redux/actions/dbaAction'
import { actions } from '../redux/constants';


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 1200,
    },
    button: {
        margin: theme.spacing(1),
    },
    narrowCell: {
        width: '100px',
    },
}));

export default function TemplateQuery() {
    const classes = useStyles();
    let history = useHistory();

    const arrTemplate = useSelector(state => state.dbaReducer.template);
    const tableSelected = useSelector(state => state.dbaReducer.tableSelected);
    const dispatch = useDispatch();

    const [typeWhere, setTypeWhere] = useState({ type: 'IN', start: "(", end: ")" });

    const handleChangeTypeWhere = (event) => {
        if (event.target.value === "IN") {
            setTypeWhere({ type: event.target.value, start: "(", end: ")" });
        } else {
            setTypeWhere({ type: event.target.value, start: "", end: "" });
        }
    };

    const generateTemplate = (templateType) => {
        let template = {};

        for (let i = 0; i < arrTemplate.length; i++) {
            const elm = arrTemplate[i];

            if (templateType === elm.typeName) {

                if (templateType === actions.ADD_SELECT_TEMPLATE.type) {//SELECT
                    //validate
                    if (elm.selectCol === "" || tableSelected === "" || elm.whereCol === "" || elm.whereValue === "") {
                        dispatch(showSnackBar(true, "Statement is incorrect", "warning"));
                        return "";
                    }

                    template = { name: `SELECT ${elm.selectCol} FROM ${tableSelected} WHERE ${elm.whereCol} ${typeWhere.type} ${typeWhere.start} ${elm.whereValue} ${typeWhere.end}` };
                    break;
                }

                if (templateType === actions.ADD_UPDATE_TEMPLATE.type) {//UPDATE
                    //validate
                    if (elm.setCol === "" || tableSelected === "" || elm.setValue === "" || elm.whereCol === "" || elm.whereValue === "") {
                        dispatch(showSnackBar(true, "Statement is incorrect", "warning"));
                        return "";
                    }

                    template = { name: `UPDATE ${tableSelected} SET ${elm.setCol} = ${elm.setValue} WHERE ${elm.whereCol} = ${elm.whereValue}` };
                    break;
                }

            }
        }

        return template;
    }

    const handleClickAdd = (e, templateType) => {
        let template = generateTemplate(templateType);
        if (template !== "") {
            dispatch(addTemplateSelect(templateType, template));
        }
    }

    const handleClickRun = (e, templateType) => {
        let template = generateTemplate(templateType);
        if (template !== "") {
            dispatch(runQuery(template.name, history, templateType));
        }
    }

    const handleChangeWhereValue = (e, template) => {
        dispatch(inputValueWhere(template, e.target.value));
    }

    const handleChangeSetValue = (e, template) => {
        dispatch(inputValueSet(template, e.target.value));
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Statement</TableCell>
                        <TableCell align="center" className={classes.narrowCell}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* SELECT STATEMENT */}
                    <TableRow key={"SELECT"}>
                        <TableCell component="th" scope="row">
                            <Grid container spacing={1} justify="center" alignItems="center" >
                                <Grid item xs={1}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom >SELECT</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <SelectColumn type={"afterSelect"} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom >FROM</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom color="primary" noWrap={true}>{tableSelected}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom >WHERE</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <SelectColumn type={"afterWhere"} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Select value={typeWhere.type} onChange={handleChangeTypeWhere} fullWidth variant="outlined">
                                        <MenuItem value={"="}>=</MenuItem>
                                        <MenuItem value={"IN"}>IN</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField variant="outlined"
                                        onChange={(e) => handleChangeWhereValue(e, actions.ADD_SELECT_TEMPLATE.type)}
                                        value={arrTemplate[0].whereValue}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">{typeWhere.start}</InputAdornment>,
                                            endAdornment: <InputAdornment position="end">{typeWhere.end}</InputAdornment>
                                        }} />
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell align="center" className={classes.narrowCell}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                endIcon={<PlaylistAddIcon />}
                                onClick={(e) => handleClickAdd(e, actions.ADD_SELECT_TEMPLATE.type)}
                            >
                                Add
                                </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<SendIcon />}
                                onClick={(e) => handleClickRun(e, actions.ADD_SELECT_TEMPLATE.type)}
                            // component={React.useMemo(() => React.forwardRef((itemProps, ref) => <RouterLink to="/result" ref={ref} {...itemProps} />))}
                            >
                                Run
                                </Button>
                        </TableCell>
                    </TableRow>
                    {/* UPDATE STATEMENT */}
                    <TableRow key={"UPDATE"}>
                        <TableCell component="th" scope="row">
                            <Grid container spacing={1} justify="center" alignItems="center" >
                                <Grid item xs={1}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom >UPDATE</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom color="primary" noWrap={true}>{tableSelected}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom >SET</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <SelectColumn type={"afterSet"} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom >=</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField variant="outlined"
                                        onChange={(e) => handleChangeSetValue(e, actions.ADD_UPDATE_TEMPLATE.type)}
                                        value={arrTemplate[1].setValue} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom >WHERE</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <SelectColumn type={"afterWhereUpdate"} />
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography variant="caption" display="block" align="center" gutterBottom >=</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <TextField variant="outlined"
                                        onChange={(e) => handleChangeWhereValue(e, actions.ADD_UPDATE_TEMPLATE.type)}
                                        value={arrTemplate[1].whereValue} />
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell align="center" className={classes.narrowCell}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                endIcon={<PlaylistAddIcon />}
                                onClick={(e) => handleClickAdd(e, actions.ADD_UPDATE_TEMPLATE.type)}
                            >
                                Add
                                </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<SendIcon />}
                                onClick={(e) => handleClickRun(e, actions.ADD_UPDATE_TEMPLATE.type)}
                            >
                                Run
                                </Button>
                        </TableCell>
                    </TableRow>


                </TableBody>
            </Table>
        </TableContainer>
    );
}


