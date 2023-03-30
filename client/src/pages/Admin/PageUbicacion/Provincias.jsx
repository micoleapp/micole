import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { getAllPaises, getAllDepartaments,getAllProvincias } from "../../../redux/SchoolsActions";
import Modal from "@mui/material/Modal";
import { Box, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
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
          Swal.fire({
            icon: "success",
            title: "Provincia creada",
          });
          dispatch(getAllProvincias());
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal!",
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
          Swal.fire({
            icon: "success",
            title: "Provincia editada",
          });
          dispatch(getAllProvincias());
          handleCloseModal()
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salio mal!",
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
          Swal.fire({
            icon: "success",
            title: "Provincia eliminada",
          });
          dispatch(getAllProvincias());
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
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

  console.log(editProvincia)

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
          <h1 className="font-medium text-xl">Todas las provincias</h1>
          <div className="flex flex-col gap-3">
            {provincias.map((dep) => (
              <div key={dep.id} className="flex gap-4 items-center border p-2 w-fit rounded-md shadow-md">
                <div className="flex flex-col w-[400px] ">
                <h1 className="text-lg"> Nombre de la provincia: {dep.nombre_provincia} </h1>
                <h2 className="text-lg">Departamento: {departaments.find(el=>el.id===dep.DepartamentoId)?.nombre_departamento} </h2>
                </div>
                <button className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through" onClick={()=>handleEditProvincia(dep.id)}>Editar</button>
          
                <button className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through" onClick={(e)=>handleDelete(e,dep.id)}>Eliminar</button>
                
              </div>
            ))}
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
