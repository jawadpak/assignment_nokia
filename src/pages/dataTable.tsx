import React, { useState, useEffect } from "react";
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
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { getAutoRefreshLoadData, getPageData } from "../model/API";
import { TicketDataType } from "../config/dataTypes";
import TaskStatus from "../components/taskStatus";
import i18n from "../config/i18n";
import EnhancedTableToolbar from "../components/tableToolbar";
import AutoCompleteSearch from "../components/autoCompleteSearch";
import TablePagination from "../components/tablePaging";
import { useHistory } from "react-router-dom";
import MLink from "@material-ui/core/Link";

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
  const [tableRows, setTableRows] = useState<TicketDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<TicketDataType[]>([]);
  const [originalData, setOriginalData] = useState<TicketDataType[]>([]);

  const history = useHistory();

  /*function use to call the API*/
  const getAutoRefreshData = async () => {
    setLoading(true);
    const apiData: TicketDataType[] = (await getAutoRefreshLoadData()) || [];
    setTableRows(apiData);
    setOriginalData(apiData);
    setLoading(false);
    return true;
  };

  const getPagingData = async (pageNo: number) => {
    setLoading(true);
    const apiData: TicketDataType[] = (await getPageData(pageNo)) || [];
    setTableRows(apiData);
    setOriginalData(apiData);
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
    const updateIsSelectedArray = await tableRows.map(x =>
      x.id === id ? { ...x, isSelected: event.target.checked } : x
    );
    setTableRows(updateIsSelectedArray);
    setSelectedRowsArray(updateIsSelectedArray);
  };

  /*call when user click the select all checkbox*/

  const handleSelectAllClick = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updateIsSelectedArray = await tableRows.map(v => ({
      ...v,
      isSelected: event.target.checked
    }));
    await setTableRows(updateIsSelectedArray);
    await setSelectedRowsArray(updateIsSelectedArray);
  };

  /*filter the operation whose status isSelected is true*/

  const setSelectedRowsArray = async (tableData: TicketDataType[]) => {
    const updateIsSelectedArray = await tableData.filter(
      task => task.isSelected === true
    );
    await setSelectedRows(updateIsSelectedArray);
    await setSelectedRows(updateIsSelectedArray);
  };

  /** just render the component*/
  useEffect(() => {}, [tableRows, selectedRows]);

  /** search from array use for auto complete  */
  const searchFromArray = async (searchValue: string) => {
    const search = new RegExp(searchValue, "i"); // prepare a regex object
    const searchResult = await originalData.filter(task =>
      search.test(task.operation)
    );
    await setTableRows(searchResult);
  };

  return (
    <div style={{ width: "100%" }}>
      <EnhancedTableToolbar tableRows={selectedRows} />

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="enhanced table"
          size={"small"}
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoRefresh}
                      onChange={handleChangeAutoRefresh}
                      name="rdAutoRefresh"
                      data-testid="rdAutoRefresh"
                    />
                  }
                  label={i18n.t("Auto refresh")}
                  data-testid="autoRefresh"
                />
              </TableCell>
              <TableCell colSpan={3}>
                <AutoCompleteSearch
                  tableRows={tableRows}
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
                    selectedRows.length > 0 &&
                    selectedRows.length < tableRows.length
                  }
                  checked={
                    tableRows.length > 0 &&
                    selectedRows.length === tableRows.length
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
            {tableRows.map((row, index) => (
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
        {/* <TablePagination
          totalNumber={100}
          handlePageChange={getPagingData}
        ></TablePagination> */}
      </TableContainer>
    </div>
  );
}
