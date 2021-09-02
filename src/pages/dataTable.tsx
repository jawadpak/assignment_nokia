import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams
} from "@material-ui/data-grid";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import CancelIcon from "@material-ui/icons/Cancel";
import { red, green } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

const columns: GridColDef[] = [
  { field: "operation", headerName: "Operation" },
  {
    field: "scope",
    headerName: "Scope"
  },
  {
    field: "timestamp",
    headerName: "Timestamp"
  },
  {
    field: "status",
    headerName: "Status"
  }
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params: GridValueGetterParams) =>
  //       `${params.getValue(params.id, "firstName") || ""} ${params.getValue(
  //         params.id,
  //         "lastName"
  //       ) || ""}`
  //   }
];

const rows = [
  {
    id: "6130c1be259df2fa0e7d32ee",
    isSelected: true,
    operation: "BITREX",
    scope: "A/B/C",
    timestamp: "2016-06-30T05:32:46 -03:00",
    status: "Interreupted"
  },
  {
    id: "6130c1becdeecbcbfad80dbc",
    isSelected: false,
    operation: "ZBOO",
    scope: "A/B/C",
    timestamp: "2016-11-18T12:31:15 -02:00",
    status: "Failed"
  },
  {
    id: "6130c1be60951693dec1f06e",
    isSelected: true,
    operation: "SONIQUE",
    scope: "A/B/C",
    timestamp: "2019-09-20T04:14:44 -03:00",
    status: "Failed"
  },
  {
    id: "6130c1be2d6ec745d793dcd9",
    isSelected: true,
    operation: "TRASOLA",
    scope: "A/B/C",
    timestamp: "2018-04-22T06:20:08 -03:00",
    status: "Interreupted"
  },
  {
    id: "6130c1bece62e79e282a8a3c",
    isSelected: false,
    operation: "TSUNAMIA",
    scope: "A/B/C",
    timestamp: "2014-06-21T11:07:22 -03:00",
    status: "Failed"
  },
  {
    id: "6130c1be1026f100bcfcc031",
    isSelected: true,
    operation: "CENTREGY",
    scope: "A/B/C",
    timestamp: "2016-10-22T01:34:37 -03:00",
    status: "Failed"
  },
  {
    id: "6130c1bec8fe96ad4385fcfb",
    isSelected: false,
    operation: "EXOSPACE",
    scope: "A/B/C",
    timestamp: "2021-02-09T03:37:21 -02:00",
    status: "Finished"
  },
  {
    id: "6130c1bece4c235273936702",
    isSelected: true,
    operation: "ZYTRAC",
    scope: "C/B/A",
    timestamp: "2016-03-10T07:29:49 -02:00",
    status: "Finished"
  }
];

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tblHeader: {
    backgroundColor: "#EEEEEE"
  }
});

interface Data {
  id: string;
  isSelected: boolean;
  operation: string;
  scope: string;
  timestamp: string;
  status: string;
}

export default function DataTable() {
  const classes = useStyles();
  const [tableRows, setTableRows] = useState<Data[]>([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: String
  ) => {
    setTableRows(
      tableRows.map(x =>
        x.id === id ? { ...x, isSelected: event.target.checked } : x
      )
    );
  };

  useEffect(() => {
    setTableRows(rows);
  }, []);
  useEffect(() => {}, [tableRows]);
  return (
    <div style={{ width: "100%" }}>
      {/* <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      /> */}
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="enhanced table"
          size={"small"}
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>Auto refresh</TableCell>
            </TableRow>
            <TableRow className={classes.tblHeader}>
              <TableCell>Operation</TableCell>
              <TableCell>Scope</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Checkbox
                    checked={row.isSelected}
                    onChange={event => handleChange(event, row.id)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />{" "}
                  &nbsp;
                  {row.operation}
                </TableCell>
                <TableCell>{row.scope}</TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>
                  <CancelIcon style={{ color: red[500] }}></CancelIcon>
                  <CheckCircleIcon
                    style={{ color: green[500] }}
                  ></CheckCircleIcon>
                  <PauseCircleOutlineIcon></PauseCircleOutlineIcon>

                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
