import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import EnrollSchool from "./pages/EnrollSchool";
import ListSchool from "./pages/ListSchool";
import SchoolDetail from "./pages/SchoolDetail";
import InscripcionColegio from "./pages/Inscripcion/InscripcionColegio";
import { useSelector } from "react-redux";
import Error from "./pages/Error";

function App() {


  const { error } = useSelector((state) => state.schools);

  return (
    <>
      <NavBar />
      {error ? (
        <Error />
      ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/enroll" element={<EnrollSchool />} />
          <Route path="/listschool" element={<ListSchool />} />
          <Route path="/schooldetail/:id" er element={<SchoolDetail />} />
          <Route path="/*" element={<Error />} />
          <Route path="*" element={<Error />} />
          <Route path="/inscripcion" element={<InscripcionColegio />} />
         
        </Routes>
      )}

      <Footer />
    </>
  );
}

export default App;
