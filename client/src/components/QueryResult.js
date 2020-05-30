import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.text.secondary,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    tableContainer: {
        marginBottom: 5,
    },
    table: {
        minWidth: 700,
    },
});

const generateCell = (row) => {
    return (
        Object.keys(row).map((key, index) => {
            return (<StyledTableCell key={index}>{String(row[key])}</StyledTableCell>)
        })
    );
}

export default function QueryResult() {
    const classes = useStyles();

    const resultQuery = useSelector(state => state.dbaReducer.resultQuery)

    if (resultQuery.length === 0) {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell align="center">There are no result.</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    return (
        // <TableContainer className={classes.tableContainer} component={Paper}>
        //     <Table className={classes.table} aria-label="customized table">
        //         <TableHead>
        //             <TableRow>
        //                 {
        //                     resultQuery.length > 0
        //                     &&
        //                     Object.keys(resultQuery[0]).map((name, index) => {
        //                         return (<StyledTableCell key={index}>{name}</StyledTableCell>)
        //                     })
        //                 }
        //             </TableRow>
        //         </TableHead>
        //         <TableBody>
        //             {
        //                 resultQuery.map((row, index) => {
        //                     return (
        //                         <StyledTableRow key={index}>
        //                             {
        //                                 generateCell(row)
        //                             }
        //                         </StyledTableRow>
        //                     )
        //                 })
        //             }
        //         </TableBody>
        //     </Table>
        // </TableContainer>

        resultQuery.map((recordSet, index_recordSet) => {
            
            return (
                <TableContainer className={classes.tableContainer} component={Paper} key={index_recordSet}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    // recordSet.length > 0
                                    // &&
                                    Object.keys(recordSet[0]).map((colName, index_colName) => {
                                        return (<StyledTableCell key={index_colName}>{colName}</StyledTableCell>)
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                recordSet.map((row, index_row) => {
                                    return (
                                        <StyledTableRow key={index_row}>
                                            {
                                                generateCell(row)
                                            }
                                        </StyledTableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        })




    );
}
