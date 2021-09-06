import { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { TABLE_NUMBER_ROWS } from "../config/dataTypes";

type InterfacePagination = {
  totalNumber: number;
  handlePageChange: (value: number) => void;
};

const TablePagination = (props: InterfacePagination) => {
  const [pageNo, setPageNo] = useState<number>(1);
  //call on page button click
  const handleChangePage = (event: unknown, newPage: number) => {
    setPageNo(newPage);
    props.handlePageChange(newPage);
  };

  return (
    <>
      <Pagination
        count={
          props.totalNumber % TABLE_NUMBER_ROWS === 0
            ? Math.round(props.totalNumber / TABLE_NUMBER_ROWS)
            : Math.round(props.totalNumber / TABLE_NUMBER_ROWS + 1)
        }
        page={pageNo}
        color="primary"
        onChange={handleChangePage}
      />
    </>
  );
};
export default TablePagination;
