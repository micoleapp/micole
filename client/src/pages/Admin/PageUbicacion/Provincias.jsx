import React, { useEffect, useState } from "react";
import axios from "axios";
import SwalProp from "../../../exports/SwalProp";
import { useSelector, useDispatch } from "react-redux";
import { getAllPaises, getAllDepartaments,getAllProvincias } from "../../../redux/SchoolsActions";
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
function Provincias() {
  const dispatch = useDispatch();
  const [provincia,setProvincia] = React.useState("")
  const [departamento, setDepartamento] = React.useState(null);
  const { paises, departaments,provincias } = useSelector((state) => state.schools);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("/provincias", { nombre_provincia:provincia, departamentoId: departamento })
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text:"Provincia creada!"
          });
          dispatch(getAllProvincias());
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

  },[])

  const handleEdit = (id,name,depId,e) => {
    e.preventDefault()
    try {
      axios
        .put(`/provincias/${id}`, { nombre_provincia: name,departamentoId:depId })
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text:"Provincia editada!"
          });
          dispatch(getAllProvincias());
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
        .delete(`/provincias/${id}`)
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito" ,
            text:"Provincia eliminada!"
          });
          dispatch(getAllProvincias());
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
    setEditProvincia({})
  };

  const [editProvincia,setEditProvincia] = useState({})

  const handleEditProvincia = (id) => {
    handleOpenModal()
    const newProvincia = provincias.find(dep=>dep.id === id)
    setEditProvincia(newProvincia)
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
      element.nombre_provincia
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };
  const getElementsForPage = (
    elements,
    page,
    itemsPerPage,
    searchTerm,
    departamento
  ) => {
    let filteredElements = filterElements(elements, searchTerm);
    if (departamento) {
      filteredElements = filteredElements.filter(
        (element) => element.DepartamentoId === departamento
      );
    }
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredElements.slice(start, end);
  };

  const [filterDep,setFilterDep] = useState("")

  return (
    <div className="flex flex-col gap-3">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label htmlFor="pais" className="font-medium text-xl">Crear provincia</label>
          <div className="flex gap-5 w-full items-end">
          <FormControl size="small" className="w-[230px]" variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Selecciona un departamento
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={departamento}
              onChange={(e) => {
                setDepartamento(e.target.value);
              }}
            >
              {departaments?.map((type, index) => (
                <MenuItem value={type.id} key={index}>
                  <ListItemText
                    primary={type.nombre_departamento}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            type="text"
            id="pais"
            name="pais"
            placeholder="Nombre provincia..."
            className="rounded-md shadow-md p-2 w-[250px] bg-slate-50  outline-none"
          />
          </div>
          <button
            type="submit"
            disabled={provincia === "" || departamento === null}
            className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md disabled:bg-black/20 disabled:text-black/40 bg-[#0061dd]/20 "
          >
            Guardar
          </button>
        </form>
        <div className="flex flex-col gap-3">
          <h1 className="font-medium text-xl">Provincias</h1>
          <div className="flex justify-between flex-col lg:flex-row items-center">
          <div className="flex items-center shadow-md bg-slate-100 w-fit rounded-md h-min">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Buscar provincia.."
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
              Filtrar por departamento
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={filterDep}
              onClick={() => setPage(1)}
              onChange={(e) => setFilterDep(e.target.value)}
            >
              <MenuItem value="" key="all">
                <ListItemText primary="Todas" />
              </MenuItem>
              {departaments.map((type, index) => (
                <MenuItem value={type.id} key={index}>
                  <ListItemText
                    primary={type.nombre_departamento}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
          <div className="flex flex-col gap-3">
            {getElementsForPage(
            provincias,
            page,
            itemsPerPage,
            searchTerm,
            filterDep
          )?.map((dep) => (
              <div key={dep.id} className="flex gap-4 items-center border p-2 w-fit rounded-md shadow-md">
                <div className="flex flex-col w-[400px] ">
                <h1 className="text-lg"> Nombre de la provincia: {dep.nombre_provincia} </h1>
                <h2 className="text-lg">Departamento: {departaments.find(el=>el.id===dep.DepartamentoId)?.nombre_departamento} </h2>
                </div>
                <button className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through" onClick={()=>handleEditProvincia(dep.id)}>Editar</button>
          
                <button className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through" onClick={(e)=>handleDelete(e,dep.id)}>Eliminar</button>
                
              </div>
            ))}
                                  <Pagination
            count={Math.ceil(
              filterElements(provincias, searchTerm).filter((element) =>
              filterDep ? element.DepartamentoId === filterDep : true
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
                <label htmlFor="pais" className="font-medium text-xl">Editar provincia</label>
                <FormControl size="small" className="w-[220px]" variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Selecciona un departamento
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={editProvincia.DepartamentoId}
              onChange={(e) => {
                setEditProvincia({...editProvincia,DepartamentoId:e.target.value});
              }}
            >
              {departaments?.map((type, index) => (
                <MenuItem value={type.id} key={index}>
                  <ListItemText
                    primary={type.nombre_departamento}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
                <input
                    value={editProvincia.nombre_provincia}
                    onChange={(e) => setEditProvincia({...editProvincia,nombre_provincia:e.target.value})}
                    type="text"
                    id="pais"
                    name="pais"
                    placeholder="Nombre provincia..."
                    className="p-2 rounded-md shadow-md bg-slate-50 w-fit outline-none"
                />
                <button
                    type="submit"
                    disabled={editProvincia.nombre_provincia === ""}
                    className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md disabled:bg-black/20 disabled:text-black/40 bg-[#0061dd]/20 "
                    onClick={(e)=>handleEdit(editProvincia.id,editProvincia.nombre_provincia,editProvincia.DepartamentoId,e)}
                >
                    Guardar
                </button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Provincias;
