import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSchoolsPage } from "../../../redux/SchoolsActions";

import CardColegio from "./card-colegio-admin/CardColegio";
import SearchCoelegio from "./search-colegio-admin/SearchCoelegio";
export default function PageColegio() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const { allschools, pagination, loading } = useSelector(
    (state) => state.schools
  );

  const [Input, setInput] = useState("");
  useEffect(() => {
    dispatch(getAllSchoolsPage(page));
  }, [page]);
  console.log(Input);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  console.log(pagination.pages);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
        <SearchCoelegio
          handlerInput={setInput}
          nroColegios={allschools?.length}
          data={allschools && allschools}
        />
        <CardColegio
          input={Input}
          data={allschools && allschools}
          isLoading={loading && loading}
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
