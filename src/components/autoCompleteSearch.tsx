/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TicketDataType } from "./../config/dataTypes";
import i18n from "../config/i18n";

interface AutoCompleteSearchProps {
  tableRows: TicketDataType[];
  searchFromArray: (value: string) => void;
}

export default function AutoCompleteSearch(props: AutoCompleteSearchProps) {
  // const [value, setValue] = React.useState<TicketDataType | null>(null);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={props.tableRows}
      getOptionLabel={option => option.operation}
      style={{ width: 300 }}
      onChange={(event: any, newValue: TicketDataType | null) => {
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
      renderInput={params => (
        <TextField
          {...params}
          label={i18n.t("Search Auto Ticket")}
          variant="outlined"
        />
      )}
    />
  );
}
