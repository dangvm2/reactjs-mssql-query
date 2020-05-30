/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import { selectCol } from '../redux/actions/dbaAction'

export default function SelectColumn(props) {

  const arrSuggestCol = useSelector(state => state.dbaReducer.arrSuggestCol);
  const template = useSelector(state => state.dbaReducer.template);
  const dispatch = useDispatch();

  function gennerateArr() {

    const arr = [...arrSuggestCol];
    arr.push({ "name": "*" });
    return arr;
  }

  const handleSelected = (event, value) => {
    if (value !== null && value !== undefined) {
      dispatch(selectCol(value, props.type));
    }
  }

  //RENDER
  if (props.type === "afterSelect") {
    return (
      <Autocomplete
        id="txtColumn"
        options={gennerateArr().map((option) => option.name)}
        onChange={handleSelected}
        value={template[0].selectCol}
        autoHighlight
        disableClearable
        autoComplete={true}
        renderInput={(params) => (
          <TextField {...params} label="" variant="outlined" />
        )}
      />
    );
  }
  else if (props.type === "afterWhere") {
    return (
      <Autocomplete
        id="txtColumn"
        options={arrSuggestCol.map((option) => option.name)}
        onChange={handleSelected}
        value={template[0].whereCol}
        autoHighlight
        disableClearable
        autoComplete={true}
        renderInput={(params) => (
          <TextField {...params} label="" variant="outlined" />
        )}
      />
    );
  }
  else if (props.type === "afterSet") {
    return (
      <Autocomplete
        id="txtColumn"
        options={arrSuggestCol.map((option) => option.name)}
        onChange={handleSelected}
        value={template[1].setCol}
        autoHighlight
        disableClearable
        autoComplete={true}
        renderInput={(params) => (
          <TextField {...params} label="" variant="outlined" />
        )}
      />
    );
  }
  else if (props.type === "afterWhereUpdate") {
    return (
      <Autocomplete
        id="txtColumn"
        options={arrSuggestCol.map((option) => option.name)}
        onChange={handleSelected}
        value={template[1].whereCol}
        autoHighlight
        disableClearable
        autoComplete={true}
        renderInput={(params) => (
          <TextField {...params} label="" variant="outlined" />
        )}
      />
    );
  }


}