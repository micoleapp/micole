import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store";

//hacemos la comprobacion si esta en dev o prod para configurar axios
//con este comando podemos hacer las peticion con axios sin poner localhost...
//podemos hacerlo directo directo axios('/review').then(etc...)

import.meta.env.MODE === "development"

 ? (axios.defaults.baseURL = "https://micole-production.up.railway.app")
 : (axios.defaults.baseURL = "https://micole-production.up.railway.app");


// import.meta.env.MODE === "development"
  ? (axios.defaults.baseURL = "http://localhost:3001/")
  : (axios.defaults.baseURL = "http://3.133.89.63:3001/");


// let previusTitle = document.title

// window.addEventListener('blur',()=>{
//   previusTitle = document.title
//   document.title = "No te vayas aún, Vuelve!!!"
// })

// window.addEventListener('focus',()=>{
//   document.title = previusTitle
// })

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
  </>
);
