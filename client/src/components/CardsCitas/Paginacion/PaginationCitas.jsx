import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import sliceIntoChunks from "./utils/SliceCitas";

export default function PaginationCitas() {
  const { citasAgendadas } = useSelector((state) => state.schools);
  const [arrCitas, setArrCitas] = React.useState(null);
  const [arr, setArr] = React.useState([]);
  const dispatch = useDispatch();

//   React.useEffect(() => {
  
//     let resultado = sliceIntoChunks(citasAgendadas, 5);
//     setArr(resultado);
//   }, []);
  console.log(arr.length);
//   const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>

      <Pagination count={arr.length} page={page} onChange={handleChange} />
    </Stack>
  );
}
