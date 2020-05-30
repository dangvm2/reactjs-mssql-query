
export const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"

export const actions = {
    //DBA
    SHOW_SNACKBAR : {
        type : "SHOW_SNACKBAR",
        linkApi : ""
    },
    SHOW_LOADING : {
        type : "SHOW_LOADING",
        linkApi : ""
    },
    GET_ALL_TABLE : {
        type : "GET_ALL_TABLE",
        linkApi : "getAllTable"
    },
    GET_ALL_COLUMN : {
        type : "GET_ALL_COLUMN",
        linkApi : "getAllColumn?table="
    },
    RUN_QUERY : {
        type : "RUN_QUERY",
        linkApi : "runQuery"
    },
    SELECT_TABLE : {
        type : "SELECT_TABLE",
        linkApi : ""
    },
    SELECT_COLUMN : {
        type : "SELECT_COLUMN",
        linkApi : ""
    },
    INPUT_VALUE_WHERE : {
        type : "INPUT_VALUE_WHERE",
        linkApi : ""
    },
    ADD_SELECT_TEMPLATE : {
        type : "ADD_SELECT_TEMPLATE",
        linkApi : ""
    },
    SET_SELECT_STATEMENT : {
        type : "SET_SELECT_STATEMENT",
        linkApi : ""
    },
    DELETE_STATEMENT : {
        type : "DELETE_STATEMENT",
        linkApi : ""
    },
    ADD_UPDATE_TEMPLATE : {
        type : "ADD_UPDATE_TEMPLATE",
        linkApi : ""
    },
    INPUT_VALUE_SET : {
        type : "INPUT_VALUE_SET",
        linkApi : ""
    },
}