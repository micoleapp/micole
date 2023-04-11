import React, { useEffect, useState } from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { GiHexagonalNut } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import {FaMapMarkerAlt} from "react-icons/fa"
import Hamburger from "hamburger-react";
import PageColegio from "./pageColegios/PageColegio";
import PageInfraestructura from "./PageInfraestructura/PageInfraestructura";
import PageAfiliaciones from "./PageAfiliaciones/PageAfiliaciones";
import PageUbicacion from "./PageUbicacion/PageUbicacion";

import { getAllSchools } from "../../redux/SchoolsActions";
import { useDispatch, useSelector } from "react-redux";
import VacanteAdmin from "./PageVacantes/VacanteAdmin";
import PanelControl from "./PanelControl/PanelControl";
import ConfigAdmin from "./Config/ConfigAdmin";
import { logout } from "../../redux/AuthActions";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
export default function MainAdmin() {
  const [page, setPage] = React.useState(0);

  
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSchools());
   
  }, []);

  return (
    <>
   
      <div  className="flex lg:flex-row flex-col">  
 
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
              Panel de Control
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
            <SchoolOutlinedIcon
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 1 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 1 ? "text-white" : null
              }`}
            >
              Colegios{" "}
            </span>
          </button>
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 2 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(2);
            }}
          >
            <FormatListNumberedOutlinedIcon
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 2 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 2? "text-white" : null
              }`}
            >
              Vacantes{" "}
            </span>
          </button>
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 3 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(3);
            }}
          >
            <LeaderboardOutlinedIcon
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 3 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 3 ? "text-white" : null
              }`}
            >
              Infraestructura
            </span>
          </button>
          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 4 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(4);
            }}
          >
            <PeopleAltOutlinedIcon
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 4 ? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 4 ? "text-white" : null
              }`}
            >
              Afiliaciones
            </span>
          </button>

          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 6 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(6);
            }}
          >
            <FaMapMarkerAlt
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 6? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 6 ? "text-white" : null
              }`}
            >
              Ubicación
            </span>
          </button> 

      

          <button
            className={`flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white ${
              page == 5 ? "bg-[#0061dd] text-white" : null
            } `}
            onClick={() => {
              setOpen();
              setPage(5);
            }}
          >
            <GiHexagonalNut
              className={`text-xl text-[#0061dd] group-focus:text-white group-hover:text-white ${
                page == 5? "text-white" : null
              }`}
            />
            <span
              className={`text-sm text-black/80 group-focus:text-white group-hover:text-white ${
                page == 5 ? "text-white" : null
              }`}
            >
              Configuración
            </span>
          </button>

          <button
            className="flex items-center duration-300 focus:bg-[#0061dd] focus:text-white cursor-pointer gap-2 group p-3 rounded-md hover:bg-[#0060dd97] hover:text-white"
            onClick={() => dispatch(logout())}
          >
            <AiOutlineLogout className="text-xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
            <span className="text-sm text-black/80 group-focus:text-white group-hover:text-white">
              Logout
            </span>
          </button>
        </ul>
      </section>
      {/* Renderizado de componentes  */}
      <section className="right w-full bg-[#f6f7f8] p-5 lg:px-31 lg:py-12">
        {page === 0 ? (
          <div className="min-h-screen">
            <PanelControl />
          </div>
        ) : page === 1 ? (
          <div className="min-h-screen">
           <PageColegio/>
          </div>
        ) : page === 2 ? (
          <div className="min-h-screen">
           <VacanteAdmin/>
          </div>
        ) : page === 3 ? (
          <div className="min-h-screen">
            <PageInfraestructura/>
          </div>
        ) : page === 4 ? (
          <div className="min-h-screen">
            <PageAfiliaciones/>
          </div>
        ) : page === 5 ? (
          <div className="min-h-screen">
          <ConfigAdmin/>
          </div>
        ) : page === 6 ? (
          <PageUbicacion/>
        ) : null}
      </section>
   
 

      </div>
    
    </>
  );
}
