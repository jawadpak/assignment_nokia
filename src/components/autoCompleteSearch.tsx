/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Data } from "./../config/dataTypes";

interface AutoCompleteSearchProps {
  tableRows: Data[];
  searchFromArray: (value: string) => void;
}

export default function AutoCompleteSearch(props: AutoCompleteSearchProps) {
  const [value, setValue] = React.useState<Data | null>(null);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.tableRows}
      getOptionLabel={option => option.operation}
      style={{ width: 300 }}
      onChange={(event: any, newValue: Data | null) => {
        //setValue(newValue);
        if (newValue) {
          props.searchFromArray(newValue.operation);
        } else {
          props.searchFromArray("");
        }
      }}
      onInputChange={(event, newInputValue) => {
        if (newInputValue === "") {
          props.searchFromArray("");
        }
      }}
      value={value}
      renderInput={params => (
        <TextField {...params} label="Search Auto Ticket" variant="outlined" />
      )}
    />
  );
}
