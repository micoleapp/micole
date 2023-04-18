import React, { useEffect, useState } from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import { GiHexagonalNut } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import Hamburger from "hamburger-react";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { getAllSchools } from "../../redux/SchoolsActions";
import { useDispatch, useSelector } from "react-redux";
import CitasUser from "./pegeCitas/CitasUser";
import { getCitaUsuario } from "../../redux/CitasActions";
import EventosUsuario from "./pageEventos/EventosUsuario";
import UserConfig from "./Config-usuario/UserConfig";
import { logout } from "../../redux/AuthActions";


export default function MainUser() {
  const [page, setPage] = React.useState(0);
  const [isOpen, setOpen] = useState(false);
 




  return (
    <>
      <div className="flex lg:flex-row flex-col">
        {/* Menu de navegacion */}
        <section
          className={`leftshadow ${
            !isOpen
              ? "h-[50px] lg:h-full lg:min-h-full"
              : "h-[500px] lg:h-full lg:min-h-full"
          } duration-300 overflow-hidden bg-white w-full lg:w-1/4 shadow-leftshadow flex justify-center z-50`}
        >
          <div className="absolute left-5 block lg:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} color="#0061dd" />
          </div>
          <ul
            className={`${
              !isOpen ? "hidden" : "flex"
            } lg:flex flex-col justify-center gap-4 static lg:absolute lg:top-48`}
          >
            <button
              className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
                page == 0 ? "bg-[#0061dd] text-white" : null
              } `}
              onClick={() => {
                setOpen();
                setPage(0);
              }}
            >
              <DashboardOutlinedIcon
                className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                  page == 0 ? "text-white" : null
                }`}
              />
              <span
                className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                  page == 0 ? "text-white" : null
                }`}
              >
                Citas
              </span>
            </button>
            <button
              className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
                page == 1 ? "bg-[#0061dd] text-white" : null
              } `}
              onClick={() => {
                setOpen();
                setPage(1);
              }}
            >
              <PersonOutlineIcon
                className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                  page == 1 ? "text-white" : null
                }`}
              />
              <span
                className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                  page == 1 ? "text-white" : null
                }`}
              >
                Eventos{" "}
              </span>
            </button>
       

            <button
              className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
                page == 3 ? "bg-[#0061dd] text-white" : null
              } `}
              onClick={() => {
                setOpen();
                setPage(2);
              }}
            >
              <GiHexagonalNut
                className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                  page == 2 ? "text-white" : null
                }`}
              />
              <span
                className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                  page == 2? "text-white" : null
                }`}
              >
                Configuracion{" "}
              </span>
            </button>

            <button
              className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
                page == 3 ? "bg-[#0061dd] text-white" : null
              } `}
              onClick={() => dispatch(logout())}
            >
              <AiOutlineLogout
                className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                  page == 3 ? "text-white" : null
                }`}
              />
              <span
                className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                  page == 3 ? "text-white" : null
                }`}
              >
                Cerrar Sesion
              </span>
            </button>
          </ul>
        </section>
        {/* Renderizado de componentes  */}
        <section className="right w-full bg-[#EEEE]  lg:px-31 lg:py-12">
          {page === 0 ? (
            <div className="min-h-screen ">
              <CitasUser  />
            </div>
          ) : page === 1 ? (
            <div className="min-h-screen flex    flex-col ">
              <EventosUsuario />
            </div>
          )
           : page === 2 ? (
            <div className="min-h-screen">
              <UserConfig />
            </div>
          ) : page === 3 ? (
            <div className="min-h-screen">
              <p>Cerrar sesion</p>
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
}
