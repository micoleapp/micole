import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import SwalProp from "../../../exports/SwalProp";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPaises,
  getAllDepartaments,
} from "../../../redux/SchoolsActions";
import Modal from "@mui/material/Modal";
import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
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
function Departamentos() {
  const dispatch = useDispatch();
  const [pais, setPais] = React.useState(null);
  const [departamento, setDepartamento] = React.useState("");
  const { paises, departaments } = useSelector((state) => state.schools);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("/departamentos", {
          id_pais: pais,
          nombre_departamento: departamento,
        })
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text: "Departamento creado!"
          });
          dispatch(getAllDepartaments());
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
  useEffect(() => {
    dispatch(getAllPaises());
    dispatch(getAllDepartaments());
  }, []);

  const handleEdit = (id, name, paisId, e) => {
    e.preventDefault();
    try {
      axios
        .put(`/departamentos/${id}`, {
          nombre_departamento: name,
          id_pais: paisId,
        })
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text:"Departamento editado!"
          });
          dispatch(getAllDepartaments());
          handleCloseModal();
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

  const handleDelete = (e, id) => {
    e.preventDefault();
    try {
      axios
        .delete(`/departamentos/${id}`)
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito" ,
            text:"Pais eliminado!"
          });
          dispatch(getAllDepartaments());
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
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditDepartamento({});
  };

  const [editDepartamento, setEditDepartamento] = useState({});

  const handleEditPais = (id) => {
    handleOpenModal();
    const newDepartamento = departaments.find((dep) => dep.id === id);
    setEditDepartamento(newDepartamento);
  };

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
      element.nombre_departamento
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };
  const getElementsForPage = (
    elements,
    page,
    itemsPerPage,
    searchTerm,
    pais
  ) => {
    let filteredElements = filterElements(elements, searchTerm);
    if (pais) {
      filteredElements = filteredElements.filter(
        (element) => element.PaisId === pais
      );
    }
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredElements.slice(start, end);
  };

  const [filterPais, setFilterPais] = useState("");

  console.log(paises)

  return (
    <div className="flex flex-col gap-3">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label htmlFor="pais" className="font-medium text-xl">
          Crear departamento
        </label>
        <div className="flex gap-5 w-full items-end">
          <FormControl size="small" className="w-[220px]" variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Selecciona un pais
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={pais}
              onChange={(e) => {
                setPais(e.target.value);
              }}
            >
              {paises?.map((type, index) => (
                <MenuItem value={type.id} key={index}>
                  <ListItemText primary={type.nombre_pais} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            type="text"
            id="pais"
            name="pais"
            placeholder="Nombre departamento..."
            className="rounded-md shadow-md p-2 w-[250px] bg-slate-50  outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={pais === null || departamento === ""}
          className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md disabled:bg-black/20 disabled:text-black/40 bg-[#0061dd]/20 "
        >
          Guardar
        </button>
      </form>
      <div className="flex flex-col gap-3">
        <h1 className="font-medium text-xl">Departamentos</h1>
        <div className="flex justify-between flex-col lg:flex-row items-center">
          <div className="flex items-center shadow-md bg-slate-100 w-fit rounded-md h-min">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Buscar departamento.."
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
              Filtrar por pais
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={filterPais}
              onClick={() => setPage(1)}
              onChange={(e) => setFilterPais(e.target.value)}
            >
              <MenuItem value="" key="all">
                <ListItemText primary="Todos" />
              </MenuItem>
              {paises.map((type, index) => (
                <MenuItem value={type.id} key={index}>
                  <ListItemText primary={type.nombre_pais} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-col gap-3">
          {getElementsForPage(
            departaments,
            page,
            itemsPerPage,
            searchTerm,
            filterPais
          )?.map((dep) => (
            <div
              key={dep.id}
              className="flex gap-4 items-center border p-2 w-fit rounded-md shadow-md"
            >
              <div className="flex flex-col w-[400px] ">
                <h1 className="text-lg">
                  {" "}
                  Nombre del departamento: {dep.nombre_departamento}{" "}
                </h1>
                <h2 className="text-lg">
                  Pais: {paises.find((el) => el.id === dep.PaisId).nombre_pais}{" "}
                </h2>
              </div>
              <button
                className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through"
                onClick={() => handleEditPais(dep.id)}
              >
                Editar
              </button>

              <button
                className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through"
                onClick={(e) => handleDelete(e, dep.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <Pagination
            count={Math.ceil(
              filterElements(departaments, searchTerm).filter((element) =>
                filterPais ? element.PaisId === filterPais : true
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
            <label htmlFor="pais" className="font-medium text-xl">
              Editar departamento
            </label>
            <FormControl size="small" className="w-[220px]" variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Selecciona un pais
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-type-select-standard"
                value={editDepartamento.PaisId}
                onChange={(e) => {
                  setEditDepartamento({
                    ...editDepartamento,
                    PaisId: e.target.value,
                  });
                }}
              >
                {paises?.map((type, index) => (
                  <MenuItem value={type.id} key={index}>
                    <ListItemText primary={type.nombre_pais} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input
              value={editDepartamento.nombre_departamento}
              onChange={(e) =>
                setEditDepartamento({
                  ...editDepartamento,
                  nombre_departamento: e.target.value,
                })
              }
              type="text"
              id="pais"
              name="pais"
              placeholder="Nombre departamento..."
              className="p-2 rounded-md shadow-md bg-slate-50 w-fit outline-none"
            />
            <button
              type="submit"
              disabled={editDepartamento.nombre_departamento === ""}
              className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md disabled:bg-black/20 disabled:text-black/40 bg-[#0061dd]/20 "
              onClick={(e) =>
                handleEdit(
                  editDepartamento.id,
                  editDepartamento.nombre_departamento,
                  editDepartamento.PaisId,
                  e
                )
              }
            >
              Guardar
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Departamentos;
