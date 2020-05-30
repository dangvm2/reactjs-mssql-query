import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTable, selectTable } from '../redux/actions/dbaAction';

const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) => option.TABLE_NAME,
});

export default function Filter() {

    const tables = useSelector(state => state.dbaReducer.tables);
    const tableSelected = useSelector(state => state.dbaReducer.tableSelected);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllTable());
    // }, []);

    const handleSelected = (event, value) => {
        if (value !== null && value.TABLE_NAME !== undefined) {
            dispatch(selectTable(value.TABLE_NAME));
        }
    }

    return (
        <Autocomplete
            id="txtTable"
            options={tables}
            getOptionLabel={(option) => option.TABLE_NAME}
            value={tableSelected === "" ? null : { TABLE_NAME: tableSelected }}
            // filterOptions={filterOptions}
            onChange={handleSelected}
            // style={{ width: 300 }}
            autoHighlight
            autoComplete={true}
            renderInput={(params) => <TextField {...params} label="Choose Table" variant="outlined" />}
        />


        //     <Autocomplete
        //     value={value}
        //     onChange={(event, newValue) => {
        //       setValue(newValue);
        //     }}
        //     inputValue={inputValue}
        //     onInputChange={(event, newInputValue) => {
        //       setInputValue(newInputValue);
        //     }}
        //     id="controllable-states-demo"
        //     options={options}
        //     style={{ width: 300 }}
        //     renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
        //   />
    );
}


