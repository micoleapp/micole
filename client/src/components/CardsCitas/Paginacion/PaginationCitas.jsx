import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import sliceIntoChunks from "./utils/SliceCitas";

export default function PaginationCitas({page,setPage,nroPaginas}) {





  const handleChange = (event, value) => {
    setPage(value-1);
  };

  return (
    <Stack spacing={2}>
      {/* <Typography>Page: {page}</Typography> */}

      <Pagination count={nroPaginas} page={page} onChange={handleChange} />
    </Stack>
  );
}
