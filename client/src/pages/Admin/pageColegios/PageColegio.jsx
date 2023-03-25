import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSchoolsPage,
  getColegiosSearch,
  getNombresColegios,
} from "../../../redux/SchoolsActions";
import axios from "axios";
import CardColegio from "./card-colegio-admin/CardColegio";
import SearchCoelegio from "./search-colegio-admin/SearchCoelegio";
import { getNombreColegios } from "../../../redux/SchoolsSlice";
export default function PageColegio() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState();
  const { allschools, pagination, loading, nameColegio } = useSelector(
    (state) => state.schools
  );
  const url = "/colegios?limit=50&";
  const [Input, setInput] = useState("");
  useEffect(() => {
    dispatch(getAllSchoolsPage(page));
    dispatch(getNombresColegios());
  }, [page]);

  console.log(data);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // "http://localhost:3001/colegios?limit=10&page=1&search="mateo""
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
        <SearchCoelegio
          handlerInput={setInput}
          nroColegios={nameColegio?.length}
          data={nameColegio &&nameColegio}
          vacante={false}
        />
        <CardColegio
          input={Input}
          data={allschools && allschools}
          isLoading={loading && loading}
          page={page}
        />
      </div>
      <Box
        justifyContent={"start"}
        alignItems={"center"}
        display={"flex"}
        sx={{ margin: "20px 0px" }}
      >
        <Pagination
          count={pagination.pages}
          onChange={handlePageChange}
          page={page}
          color="primary"
        />
      </Box>
    </>
  );
}
