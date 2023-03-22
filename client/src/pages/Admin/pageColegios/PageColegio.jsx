import React, { useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { getAllSchools } from "../../../redux/SchoolsActions";
export default function PageColegio() {
  const dispatch = useDispatch();
  const { allschools } = useSelector((state) => state.schools);
  useEffect(() => {
    dispatch(getAllSchools());
  }, []);

  return <div>PageColegio</div>;
}
