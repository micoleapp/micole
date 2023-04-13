import React, { useEffect } from "react";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import Logo from "../assets/logo1.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
function Footer() {
  const [toggle, setToggle] = useState(false);

  function scrollTop() {
    window.scrollTo({
      top: -document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
  
  const [toggleMenuContact, setToggleMenuContact] = useState(false);
  const [toggleMenuCategory, setToggleMenuCategory] = useState(false);
  const [toggleMenuMenu, setToggleMenuMenu] = useState(false);

  return (
    <div
      id="div"
      className={`bg-gradient-to-b p-5 from-[#0c2337] to-[#1a4266] text-white w-full sm:h-[350px]
       flex flex-col justify-center items-center sm:items-stretch sm:justify-between duration-500`}
    >
      <div
        className={`h-full transition-all duration-500
        flex gap-10 sm:gap-0 flex-col sm:flex-row my-5 justify-around`}
      >
        <ul className="font-normal flex flex-col gap-5 ">
          <li
            className="font-bold text-xl z-50 flex items-center gap-2 cursor-pointer sm:cursor-default"
            onClick={() => setToggleMenuContact(!toggleMenuContact)}
          >
            Contáctenos
            <FontAwesomeIcon
              className="block sm:hidden"
              icon={toggleMenuContact ? faChevronUp : faChevronDown}
            />
          </li>
          <ul
            className={`flex duration-200 flex-col gap-5 sm:translate-y-0 -translate-y-full h-0 static ${
              toggleMenuContact
                ? "translate-y-0 h-max"
                : "opacity-0 sm:opacity-100"
            }`}
          >
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faLocationDot} />
              Av. Costanera 2438
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPhone} />
              981 784 174
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faEnvelope} />
              informes@micole.com.pe
            </li>
            <li className="flex gap-2">
              <a
                href="https://www.facebook.com/Micole.peru"
                className="w-8 h-8 items-center justify-center flex rounded-md hover:bg-white/20"
                target="_blank"
              >
                <FontAwesomeIcon color="white" icon={faFacebookF} />
              </a>
              <a
                href="#"
                className="w-8 h-8 items-center justify-center flex rounded-md hover:bg-white/20"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#"
                className="w-8 h-8 items-center justify-center flex rounded-md hover:bg-white/20"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.linkedin.com/company/91744571"
                target="_blank"
                className="w-8 h-8 items-center justify-center flex rounded-md hover:bg-white/20"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </li>
          </ul>
        </ul>
        {/* <ul className="font-normal flex flex-col gap-5">
          <li
            className="font-bold text-xl z-50 flex items-center gap-2 cursor-pointer sm:cursor-default"
            onClick={() => setToggleMenuCategory(!toggleMenuCategory)}
          >
            Categorías
            <FontAwesomeIcon
              className="block sm:hidden"
              icon={toggleMenuCategory ? faChevronUp : faChevronDown}
            />
          </li>
          <ul
            className={`flex duration-200 flex-col gap-5 sm:translate-y-0 -translate-y-full h-0 static ${
              toggleMenuCategory
                ? "translate-y-0 h-max"
                : "opacity-0 sm:opacity-100"
            }`}
          >
            <li className="hover-underline-animation w-min cursor-default">
              Religiosos
            </li>
            <li className="hover-underline-animation w-min cursor-default">
              Internacionales
            </li>
            <li className="hover-underline-animation w-min cursor-default">
              Mujeres
            </li>
            <li className="hover-underline-animation w-min cursor-default">
              Hombres
            </li>
            <li className="hover-underline-animation w-min cursor-default">
              Especiales
            </li>
          </ul>
        </ul> */}
        <ul className="font-normal flex flex-col gap-5">
          <li
            className="font-bold text-xl z-50 flex items-center gap-2 cursor-pointer sm:cursor-default"
            onClick={() => setToggleMenuMenu(!toggleMenuMenu)}
          >
            Menú
            <FontAwesomeIcon
              className="block sm:hidden"
              icon={toggleMenuMenu ? faChevronUp : faChevronDown}
            />
          </li>
          <ul
            className={`flex duration-200 flex-col gap-5 sm:translate-y-0 -translate-y-full h-0 static ${
              toggleMenuMenu
                ? "translate-y-0 h-max"
                : "opacity-0 sm:opacity-100"
            }`}
          >
            <Link to="/" onClick={()=>scrollTop()}>
              <li className="hover-underline-animation w-min cursor-pointer">
                Inicio
              </li>
            </Link>
            <li className="hover-underline-animation w-min cursor-default">
              {" "}
              <Link to={"/?categorias=1"}>Categorías</Link>
            </li>
            <li className="hover-underline-animation w-min cursor-default">
              Blog
            </li>
          </ul>
        </ul>
      </div>
      <div
        className={`flex w-full items-center justify-center h-1/5`}
      >
        <img src={Logo} alt="logo" />
      </div>
    </div>
  );
}

export default Footer;
