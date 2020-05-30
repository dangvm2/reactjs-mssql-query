import axios from 'axios'
import { url, actions } from '../constants';

export function showSnackBar(showSnackBar, message, severity) {
    return (dispatch) => {
        dispatch({ type: actions.SHOW_SNACKBAR.type, showSnackBar, message, severity })
    }
}
export function getAllTable() {
    return (dispatch) => {
        axios.get(`${url}${actions.GET_ALL_TABLE.linkApi}`)
            .then((res) => {
                let tables = res.data
                dispatch({ type: actions.GET_ALL_TABLE.type, tables })
            }).catch((err) => {
                console.log(err)
            })
    }
}
export function selectTable(tableName) {
    return (dispatch) => {
        axios.get(`${url}${actions.GET_ALL_COLUMN.linkApi}${tableName}`)
            .then((res) => {
                let columns = res.data
                dispatch({ type: actions.SELECT_TABLE.type, tableName, columns })
            }).catch((err) => {
                console.log(err)
            })
    }
}
export function runQuery(query, history, templateType) {
    return (dispatch) => {

        dispatch({ type: actions.SHOW_LOADING.type, showLoading: true })//show loading first

        axios.post(`${url}${actions.RUN_QUERY.linkApi}`, {
            query: query
        })
            .then(function (res) {

                let resultQuery = res.data
                dispatch({ type: actions.RUN_QUERY.type, resultQuery })

                if (templateType === actions.ADD_UPDATE_TEMPLATE.type) {
                    dispatch({ type: actions.SHOW_SNACKBAR.type, showSnackBar: true, message: "Update successful", severity: "success" })
                } else {
                    history.push('/result');
                }


                dispatch({ type: actions.SHOW_LOADING.type, showLoading: false })//close loading
            })
            .catch(function (error) {
                console.log(error);
                if (templateType === actions.ADD_UPDATE_TEMPLATE.type) {
                    dispatch({ type: actions.SHOW_SNACKBAR.type, showSnackBar: true, message: String(error), severity: "error" })
                }
                dispatch({ type: actions.SHOW_LOADING.type, showLoading: false })//close loading
            });
    }
}
export function selectCol(colName, location) {
    return (dispatch) => {
        dispatch({ type: actions.SELECT_COLUMN.type, location, colName })
    }
}
export function inputValueWhere(template, valueInput) {
    return (dispatch) => {
        dispatch({ type: actions.INPUT_VALUE_WHERE.type, template, valueInput })
    }
}
export function inputValueSet(template, valueInput) {
    return (dispatch) => {
        dispatch({ type: actions.INPUT_VALUE_SET.type, template, valueInput })
    }
}
export function addTemplateSelect(templateType, template) {
    return (dispatch) => {
        if (actions.ADD_SELECT_TEMPLATE.type === templateType) {
            dispatch({ type: actions.ADD_SELECT_TEMPLATE.type, template })
        } else if (actions.ADD_UPDATE_TEMPLATE.type === templateType) {
            dispatch({ type: actions.ADD_UPDATE_TEMPLATE.type, template })
        }
    }
}
export function selectStatement(newArrSelected) {
    return (dispatch) => {
        dispatch({ type: actions.SET_SELECT_STATEMENT.type, newArrSelected })
    }
}
export function deleteStatement(newArrStatement) {
    return (dispatch) => {
        dispatch({ type: actions.DELETE_STATEMENT.type, newArrStatement })
    }
}