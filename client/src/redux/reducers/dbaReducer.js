import { actions } from '../constants'

const initialState = {
    typeRender: 0,//0: query, 1: result
    tables: [],
    arrMultipleQuery: [],
    snackBar: {
        showSnackBar: false,
        message: "",
        severity: "",//error, warning, info, success
    },
    showLoading: false,
    template: [
        {
            typeName: actions.ADD_SELECT_TEMPLATE.type,//SELECT
            selectCol: "*",
            fromTable: "",
            whereCol: "",
            whereValue: "",
        },
        {
            typeName: actions.ADD_UPDATE_TEMPLATE.type,//UPDATE
            updateTable: "",
            setCol: "",
            setValue: "",
            whereCol: "",
            whereValue: "",
        },
    ],
    tableSelected: "",
    arrSuggestCol: [],
    resultQuery: [],
    arrSelected: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SHOW_SNACKBAR.type:
            return {
                ...state,
                snackBar: {
                    showSnackBar: action.showSnackBar,
                    message: action.message,
                    severity: action.severity,
                }
            }
        case actions.SHOW_LOADING.type:
            return {
                ...state,
                showLoading: action.showLoading
            }
        case actions.GET_ALL_TABLE.type:
            return {
                ...state,
                tables: action.tables
            }
        case actions.SELECT_TABLE.type:
            return {
                ...state,
                tableSelected: action.tableName,
                arrSuggestCol: action.columns,
                template: [
                    {
                        typeName: actions.ADD_SELECT_TEMPLATE.type,//SELECT
                        selectCol: "*",
                        fromTable: "",
                        whereCol: "",
                        whereValue: "",
                    },
                    {
                        typeName: actions.ADD_UPDATE_TEMPLATE.type,//UPDATE
                        updateTable: "",
                        setCol: "",
                        setValue: "",
                        whereCol: "",
                        whereValue: "",
                    },
                ],
            }
        case actions.SELECT_COLUMN.type:
            if (action.location === "afterSelect") {
                let newValue = state.template[0]
                newValue.selectCol = action.colName
                return {
                    ...state,
                    template: [...state.template, newValue]
                }
            } else if (action.location === "afterWhere") {
                let newValue = state.template[0]
                newValue.whereCol = action.colName
                return {
                    ...state,
                    template: [...state.template, newValue]
                }
            } else if (action.location === "afterSet") {
                let newValue = state.template[1]
                newValue.setCol = action.colName
                return {
                    ...state,
                    template: [...state.template, newValue]
                }
            } else if (action.location === "afterWhereUpdate") {
                let newValue = state.template[1]
                newValue.whereCol = action.colName
                return {
                    ...state,
                    template: [...state.template, newValue]
                }
            }
        case actions.RUN_QUERY.type:
            return {
                ...state,
                resultQuery: action.resultQuery,
            }
        case actions.INPUT_VALUE_WHERE.type:
            if (action.template === actions.ADD_SELECT_TEMPLATE.type) { //SELECT
                let newValue = state.template[0]
                newValue.whereValue = action.valueInput
                return {
                    ...state,
                    template: [...state.template, newValue]
                }
            }
            if (action.template === actions.ADD_UPDATE_TEMPLATE.type) { //UPDATE
                let newValue = state.template[1]
                newValue.whereValue = action.valueInput
                return {
                    ...state,
                    template: [...state.template, newValue]
                }
            }
        case actions.INPUT_VALUE_SET.type:
            if (action.template === actions.ADD_UPDATE_TEMPLATE.type) { //UPDATE
                let newValue = state.template[1]
                newValue.setValue = action.valueInput
                return {
                    ...state,
                    template: [...state.template, newValue]
                }
            }
        case actions.ADD_SELECT_TEMPLATE.type:
            if (state.arrMultipleQuery.some(el => el.name === action.template.name)) {//Statement is exist
                return {
                    ...state,
                    arrMultipleQuery: state.arrMultipleQuery,
                    snackBar: {
                        showSnackBar: true,
                        message: "This query is exist!",
                        severity: "warning",
                    }
                }
            }
            return {
                ...state,
                arrMultipleQuery: [...state.arrMultipleQuery, action.template]
            }
        case actions.ADD_UPDATE_TEMPLATE.type:
            if (state.arrMultipleQuery.some(el => el.name === action.template.name)) {//Statement is exist
                return {
                    ...state,
                    arrMultipleQuery: state.arrMultipleQuery,
                    snackBar: {
                        showSnackBar: true,
                        message: "This query is exist!",
                        severity: "warning",
                    }
                }
            }
            return {
                ...state,
                arrMultipleQuery: [...state.arrMultipleQuery, action.template]
            }
        case actions.SET_SELECT_STATEMENT.type:
            return {
                ...state,
                arrSelected: action.newArrSelected
            }
        case actions.DELETE_STATEMENT.type:
            return {
                ...state,
                arrMultipleQuery: action.newArrStatement,
                arrSelected: []
            }
        default:
            return state
    }
}