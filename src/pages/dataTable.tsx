import React, { useState, useEffect, useReducer, useMemo } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress";

import { getAutoRefreshLoadData, getPageData } from "../model/API";
import { TicketDataType } from "../config/dataTypes";
import TaskStatus from "../components/taskStatus";
import i18n from "../config/i18n";
import EnhancedTableToolbar from "../components/tableToolbar";
import AutoCompleteSearch from "../components/autoCompleteSearch";
import TablePagination from "../components/tablePaging";
import { useHistory } from "react-router-dom";
import MLink from "@material-ui/core/Link";
import ToggleAutoRefresh from "../components/toggleAutoRefresh";
import { DataReducer, DataState } from "../model/reduceReact";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tblHeader: {
    backgroundColor: "#EEEEEE"
  }
});
export default function DataTable() {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

  const initialState: DataState = {
    data: [],
    originalData: [],
    selectFlag: false,
    findObj: undefined,
    selectedObjNumber: 0
  };

  const a = useState<TicketDataType>();
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const history = useHistory();

  /*function use to call the API*/
  const getAutoRefreshData = async () => {
    setLoading(true);
    const apiData: TicketDataType[] = (await getAutoRefreshLoadData()) || [];
    setLoading(false);
    return true;
  };

  const getPagingData = async (pageNo: number) => {
    setLoading(true);
    const apiData: TicketDataType[] = (await getPageData(pageNo)) || [];
    dispatch({ type: "SET_ARRAY", payload: { data: apiData } });
    setLoading(false);
    return true;
  };

  useEffect(() => {
    getPagingData(1);
  }, []);

  const handleChangeAutoRefresh = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAutoRefresh(event.target.checked);
    console.log("START!");
    const limitedInterval = setInterval(() => {
      if (event.target.checked) {
        getAutoRefreshData();
      } else if (!event.target.checked) {
        console.log("End!");
        clearInterval(limitedInterval);
      }
    }, 3000);
  };

  /*call when user click the single checkbox*/

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: String
  ) => {
    const updateIsSelectedArray = await state.data.map(x =>
      x.id === id ? { ...x, isSelected: event.target.checked } : x
    );
    dispatch({
      type: "SELECT_ALL_FLAG",
      payload: { data: updateIsSelectedArray }
    });
  };

  /*call when user click the select all checkbox*/

  const handleSelectAllClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updateIsSelectedArray = await state.data.map(v => ({
      ...v,
      isSelected: event.target.checked
    }));

    dispatch({
      type: "SELECT_ALL_FLAG",
      payload: { data: updateIsSelectedArray }
    });
  };

  /** search from array use for auto complete  */
  const searchFromArray = async (searchValue: string) => {
    const search = new RegExp(searchValue, "i"); // prepare a regex object
    const searchResult = await state.originalData.filter(
      (task: TicketDataType) => search.test(task.operation)
    );
    dispatch({ type: "SET_SEARCH_ARRAY", payload: { data: searchResult } });
  };
  //example how use useMemo in react
  const [number, setNumber] = useState(1);
  const changeNumber = (val: number) => {
    setNumber(val);
  };

  const sumDoubleNumber = (val: number) => val + val;
  const sumResult = useMemo(() => sumDoubleNumber(number), [number]);
  ///
  return (
    <div style={{ width: "100%" }}>
      <EnhancedTableToolbar tableRows={state.selectedObjNumber} />

      <Button variant="text" onClick={() => changeNumber(2)}>
        Add 2
      </Button>
      <Button variant="text" onClick={() => changeNumber(3)}>
        Add 3
      </Button>

      <span>{sumResult}</span>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="enhanced table"
          size={"small"}
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <ToggleAutoRefresh
                  autoRefresh={autoRefresh}
                  handleChangeAutoRefresh={handleChangeAutoRefresh}
                ></ToggleAutoRefresh>
              </TableCell>
              <TableCell colSpan={3}>
                <AutoCompleteSearch
                  tableRows={state.data}
                  searchFromArray={searchFromArray}
                ></AutoCompleteSearch>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}>
                <TablePagination
                  totalNumber={100}
                  handlePageChange={getPagingData}
                ></TablePagination>{" "}
              </TableCell>
            </TableRow>
            {loading && (
              <TableRow>
                <TableCell colSpan={5}>
                  {" "}
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
            <TableRow className={classes.tblHeader}>
              <TableCell>
                {" "}
                <Checkbox
                  indeterminate={
                    state.selectedObjNumber > 0 &&
                    state.selectedObjNumber < state.data.length
                  }
                  checked={
                    state.data.length > 0 &&
                    state.selectedObjNumber === state.data.length
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all record" }}
                />
              </TableCell>
              <TableCell>{i18n.t("Operation")}</TableCell>
              <TableCell>{i18n.t("Scope")}</TableCell>
              <TableCell>{i18n.t("Timestamp")}</TableCell>
              <TableCell>{i18n.t("Status")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((row: TicketDataType, index: number) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Checkbox
                    checked={row.isSelected}
                    onChange={event => handleCheckboxChange(event, row.id)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />{" "}
                </TableCell>
                <TableCell component="th" scope="row">
                  <MLink
                    component="button"
                    variant="body2"
                    onClick={() => {
                      history.push("/ticket/" + row.id);
                    }}
                  >
                    {row.operation}
                  </MLink>
                </TableCell>
                <TableCell>{row.scope}</TableCell>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>
                  <TaskStatus taskStatus={row.status}></TaskStatus>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
