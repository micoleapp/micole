import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationCitas from "../../../components/CardsCitas/Paginacion/PaginationCitas";
import sliceIntoChunks from "../../../components/CardsCitas/Paginacion/utils/SliceCitas";
import { getAllSchools } from "../../../redux/SchoolsActions";
import CardColegio from "./card-colegio-admin/CardColegio";
import SearchCoelegio from "./search-colegio-admin/SearchCoelegio";
export default function PageColegio() {
  const dispatch = useDispatch();
  const { allschools, loading } = useSelector((state) => state.schools);

  const [Input, setInput] = useState("");
 

  console.log(Input);

  return (
    <>
      {/* searh colegio */}

      <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
        <SearchCoelegio handlerInput={setInput}   nroColegios={allschools?.length} data={ allschools&& allschools} />
        <CardColegio input={Input} data={allschools&& allschools} isLoading={loading&& loading} />
      </div>

   
    </>
  );
}
