import React, { useEffect, useState } from "react";
import axios from "axios";
import SwalProp from "../../../exports/SwalProp";
import { useSelector, useDispatch } from "react-redux";
import { getAllPaises, getAllDepartaments,getAllProvincias,getAllDistrits } from "../../../redux/SchoolsActions";
import Modal from "@mui/material/Modal";
import { Box, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "@mui/material/Pagination";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "auto",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};
function Distritos() {
  const dispatch = useDispatch();
  const [provincia,setProvincia] = React.useState(null)
  const [distrito, setDistrito] = React.useState("");
  const { paises, departaments,provincias,distrits } = useSelector((state) => state.schools);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("/distritos", { nombre_distrito:distrito, ProvinciaId: provincia })
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito" ,
            text:"Distrito creado!"
          });
          dispatch(getAllDistrits());
        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Ups!...",
            text: "Algo salió mal!",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    dispatch(getAllPaises())
    dispatch(getAllDepartaments())
    dispatch(getAllProvincias());
    dispatch(getAllDistrits());

  },[])

  const handleEdit = (id,name,depId,e) => {
    e.preventDefault()
    try {
      axios
        .put(`/distritos/${id}`, { nombre_distrito: name,ProvinciaId:depId })
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text:"Distrito editado!"
          });
          dispatch(getAllDistrits());
          handleCloseModal()
        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Ups!...",
            text: "Algo salió mal!",
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = (e,id) => {
    e.preventDefault()
    try {
      axios
        .delete(`/distritos/${id}`)
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito" ,
            text:"Distrito eliminado!"
          });
          dispatch(getAllDistrits());
        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Ups!...",
            text: err.response.data.message,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditDistrito({})
  };

  const [editDistrito,setEditDistrito] = useState({})

  const handleEditDistrito = (id) => {
    handleOpenModal()
    const newDistrito = distrits.find(dep=>dep.id === id)
    setEditDistrito(newDistrito)
  }

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filterElements = (elements, searchTerm) => {
    return elements.filter((element) =>
      element.nombre_distrito
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };
  const getElementsForPage = (
    elements,
    page,
    itemsPerPage,
    searchTerm,
    provincia
  ) => {
    let filteredElements = filterElements(elements, searchTerm);
    if (provincia) {
      filteredElements = filteredElements.filter(
        (element) => element.ProvinciaId === provincia
      );
    }
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredElements.slice(start, end);
  };

  const [filterProvincia,setFilterProvincia] = useState("")

  return (
    <div className="flex flex-col gap-3">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label htmlFor="pais" className="font-medium text-xl">Crear distrito</label>
          <div className="flex gap-5 w-full items-end">
          <FormControl size="small" className="w-[230px]" variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Selecciona una provincia
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={provincia}
              onChange={(e) => {
                setProvincia(e.target.value);
              }}
            >
              {provincias?.map((type, index) => (
                <MenuItem value={type.id} key={index}>
                  <ListItemText
                    primary={type.nombre_provincia}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            value={distrito}
            onChange={(e) => setDistrito(e.target.value)}
            type="text"
            id="pais"
            name="pais"
            placeholder="Nombre distrito..."
            className="rounded-md shadow-md p-2 w-[250px] bg-slate-100  outline-none"
          />
          </div>
          <button
            type="submit"
            disabled={distrito === "" || provincia === null}
            className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md disabled:bg-black/20 disabled:text-black/40 bg-[#0061dd]/20 "
          >
            Guardar
          </button>
        </form>
        <div className="flex flex-col gap-3">
          <h1 className="font-medium text-xl">Distritos</h1>
          <div className="flex justify-between flex-col lg:flex-row items-center">
          <div className="flex items-center shadow-md bg-slate-100 w-fit rounded-md h-min">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Buscar distrito.."
              class="p-2 outline-none rounded-md bg-slate-100 lg:w-[300px]"
              value={searchTerm}
              onChange={handleSearch}
            />
            <label htmlFor="search">
              <AiOutlineSearch className="text-xl mr-3  cursor-pointer" />
            </label>
          </div>
          <FormControl
            variant="standard"
            style={{ width: "200px", height: "70px" }}
            size="small"
          >
            <InputLabel id="demo-simple-select-standard-label">
              Filtrar por provincia
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={filterProvincia}
              onClick={() => setPage(1)}
              onChange={(e) => setFilterProvincia(e.target.value)}
            >
              <MenuItem value="" key="all">
                <ListItemText primary="Todas" />
              </MenuItem>
              {provincias.map((type, index) => (
                <MenuItem value={type.id} key={index}>
                  <ListItemText
                    primary={type.nombre_provincia}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
          <div className="flex flex-col gap-3">
            {getElementsForPage(
            distrits,
            page,
            itemsPerPage,
            searchTerm,
            filterProvincia
          )?.map((dep) => (
              <div key={dep.id} className="flex gap-4 items-center border p-2 w-fit rounded-md shadow-md">
                <div className="flex flex-col w-[400px] ">
                <h1 className="text-lg"> Nombre del distrito: {dep.nombre_distrito} </h1>
                <h2 className="text-lg">Provincia: {provincias.find(el=>el.id===dep.ProvinciaId)?.nombre_provincia} </h2>
                </div>
                <button className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through" onClick={()=>handleEditDistrito(dep.id)}>Editar</button>
          
                <button className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through" onClick={(e)=>handleDelete(e,dep.id)}>Eliminar</button>
                
              </div>
            ))}
                      <Pagination
            count={Math.ceil(
              filterElements(distrits, searchTerm).filter((element) =>
              filterProvincia ? element.ProvinciaId === filterProvincia : true
              ).length / itemsPerPage
            )}
            page={page}
            onChange={handleChangePage}
          />
        </div>
        </div>
        <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
            <form className="flex flex-col justify-center items-center gap-5">
                <label htmlFor="pais" className="font-medium text-xl">Editar distrito</label>
                <FormControl size="small" className="w-[220px]" variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Selecciona una provincia
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={editDistrito.ProvinciaId}
              onChange={(e) => {
                setEditDistrito({...editDistrito,ProvinciaId:e.target.value});
              }}
            >
              {provincias?.map((type, index) => (
                <MenuItem value={type.id} key={index}>
                  <ListItemText
                    primary={type.nombre_provincia}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
                <input
                    value={editDistrito.nombre_distrito}
                    onChange={(e) => setEditDistrito({...editDistrito,nombre_distrito:e.target.value})}
                    type="text"
                    id="pais"
                    name="pais"
                    placeholder="Nombre distrito..."
                    className="p-2 rounded-md shadow-md bg-slate-50 w-fit outline-none"
                />
                <button
                    type="submit"
                    disabled={editDistrito.nombre_distrito === ""}
                    className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md disabled:bg-black/20 disabled:text-black/40 bg-[#0061dd]/20 "
                    onClick={(e)=>handleEdit(editDistrito.id,editDistrito.nombre_distrito,editDistrito.ProvinciaId,e)}
                >
                    Guardar
                </button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Distritos;
