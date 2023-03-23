import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationCitas from "../../../components/CardsCitas/Paginacion/PaginationCitas";
import sliceIntoChunks from "../../../components/CardsCitas/Paginacion/utils/SliceCitas";
import { getAllSchools } from "../../../redux/SchoolsActions";
import CardColegio from "./card-colegio-admin/CardColegio";
import SearchCoelegio from "./search-colegio-admin/SearchCoelegio";
export default function PageColegio() {
  const dispatch = useDispatch();
  const { allschools } = useSelector((state) => state.schools);
  const [colegio, setColegio] = useState([]);
  const [page, setPage] = React.useState(0);
  const [Input, setInput] = useState("");
  useEffect(() => {
    dispatch(getAllSchools());
    let paginaColegios = sliceIntoChunks( allschools&&allschools, 5);
    setColegio(paginaColegios);
  }, []);
  console.log(colegio);
  console.log(Input);

  return (
    <>
      {/* searh colegio */}

      <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
        <SearchCoelegio handlerInput={setInput}   nroColegios={allschools?.length} data={ colegio&& colegio} />
        <CardColegio input={Input} data={colegio&& colegio[page]} />
      </div>

      <PaginationCitas
        nroPaginas={colegio?.length}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
