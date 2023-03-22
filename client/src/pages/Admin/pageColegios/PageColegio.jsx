import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSchools } from "../../../redux/SchoolsActions";
import CardColegio from "./card-colegio-admin/CardColegio";
import SearchCoelegio from "./search-colegio-admin/SearchCoelegio";
export default function PageColegio() {
  const dispatch = useDispatch();
  const { allschools } = useSelector((state) => state.schools);
  const [colegio, setColegio] = useState([]);
  const [Input, setInput] = useState("");
  useEffect(() => {
    dispatch(getAllSchools());
    setColegio(allschools)
  }, []);
console.log(colegio)
console.log(Input)

return<>
  {/* searh colegio */}


  <div style={{display:'flex', flexDirection:'column',  gap:'3vh'}}>
      <SearchCoelegio   handlerInput={setInput}  data={colegio} />
      <CardColegio  input={Input}  data={colegio}  />
  </div>
  
  </>
}
