import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import EnrollSchool from "./pages/EnrollSchool";
import ListSchool from "./pages/ListSchool";
import SchoolDetail from "./pages/SchoolDetail";
import InfoPlanes from "./components/FormPayment/utils/InfoPlanes";
import { useSelector, useDispatch } from "react-redux";
import Error from "./pages/Error";

import DashboardSchool from "./pages/DashboardSchool";
import { getUserByToken, getSchoolDetail } from "./redux/AuthActions";
import { useNavigate } from "react-router-dom";
import {
  getAllCategories,
  getAllDepartaments,
  getAllDistrits,
  getAllProvincias,
  getAllInfraestructura,
  getAllPaises,
  getAllNiveles,
  getAllAfiliaciones,
  getAllGrados,
  getAllSchools,
  getCitaAgendadas,
  getAllDificultades,
  getAllMetodos,
  setPrecios
} from "./redux/SchoolsActions";

import RequireAuth from "./components/RequireAuth";
import { getCita } from "./redux/CitasActions";
import MainAdmin from "./pages/Admin/MainAdmin";
import MainUser from "./pages/User/MainUser";

function App() {
  const { error: errorSchool } = useSelector((state) => state.schools);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllGrados());
    dispatch(getAllDepartaments());
    dispatch(getAllDistrits());
    dispatch(getAllProvincias());
    dispatch(getAllInfraestructura());
    dispatch(getAllPaises());
    dispatch(getAllNiveles());
    dispatch(getAllAfiliaciones());
    dispatch(setPrecios())
    // dispatch(getAllSchools())
    dispatch(getUserByToken());
  //  if (user?.rol === 'Colegio'){
  //       dispatch(getCita());
  //   dispatch(getCitaAgendadas());
  //  }

    dispatch(getAllMetodos());
    dispatch(getAllDificultades());
  }, []);

  useEffect(() => {
    if (user?.rol  === 'Colegio') {
      dispatch(getSchoolDetail(user.id));
    }
    // if(user?.rol === "Colegio"){
    //   dispatch(getCitaAgendadas(user.id));
    // }
  }, [user]);

  return (
    <>
      <NavBar />
      {errorSchool ? (
        <Error />
      ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/enroll" element={<EnrollSchool />} />
          <Route path="/listschool" element={<ListSchool />} />
          <Route path="/schooldetail/:id" er element={<SchoolDetail />} />

          <Route path="/*" element={<Error />} />
          <Route path="*" element={<Error />} />
          {user?.rol === "Colegio" && (
            <Route
              exact
              path="/dashboardschool"
              element={
                <RequireAuth>
                  <DashboardSchool />
                </RequireAuth>
              }
            />
          )}

          {user?.rol === "Admin" && (
            <Route path="/admin" element={<MainAdmin />} />
          )}
          {user?.rol === "Usuario" && (
            <Route path="/user" element={<MainUser />} />
          )}
        </Routes>
      )}

      <Footer />
    </>
  );
}

export default App;
