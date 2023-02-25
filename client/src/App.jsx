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
import { useNavigate } from "react-router-dom";
import Error from "./pages/Error";
import Payment from "./pages/Payment/Payment";
import DashboardSchool from "./pages/DashboardSchool";
import { getUserByToken, getSchoolDetail } from "./redux/AuthActions";
import {
  getAllCategories,
  getAllDepartaments,
  getAllDistrits,
  getAllProvincias,
  getAllInfraestructura,
  getAllPaises,
} from "./redux/SchoolsActions";
import Protected from "./components/Protected";

function App() {
  const navigate = useNavigate();
  const { error: errorSchool } = useSelector((state) => state.schools);
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllDepartaments());
    dispatch(getAllDistrits());
    dispatch(getAllProvincias());
    dispatch(getAllInfraestructura());
    dispatch(getAllPaises());
    dispatch(getUserByToken());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getSchoolDetail(user.id));
    }
  }, [user]);

  return (
    <>
      <NavBar />
      {errorSchool ? (
        <Error />
      ) : (
        <Routes>
            <Route path="/dashboardschool" element={<DashboardSchool />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/enroll" element={<EnrollSchool />} />
          <Route path="/listschool" element={<ListSchool />} />
          <Route path="/schooldetail/:id" er element={<SchoolDetail />} />
          <Route path="/*" element={<Error />} />
          <Route path="*" element={<Error />} />

          <Route path="/payment" element={<Payment />} />
        </Routes>
      )}

      <Footer />
    </>
  );
}

export default App;
