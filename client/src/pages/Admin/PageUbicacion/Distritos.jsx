import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { getAllPaises, getAllDepartaments,getAllProvincias,getAllDistrits } from "../../../redux/SchoolsActions";
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
          Swal.fire({
            icon: "success",
            title: "Distrito creado",
          });
          dispatch(getAllDistrits());
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
    dispatch(getAllDistrits());

  },[])

  const handleEdit = (id,name,depId,e) => {
    e.preventDefault()
    try {
      axios
        .put(`/distritos/${id}`, { nombre_distrito: name,ProvinciaId:depId })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Distrito editado",
          });
          dispatch(getAllDistrits());
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
        .delete(`/distritos/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Distrito eliminado",
          });
          dispatch(getAllDistrits());
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
    setEditDistrito({})
  };

  const [editDistrito,setEditDistrito] = useState({})

  const handleEditDistrito = (id) => {
    handleOpenModal()
    const newDistrito = distrits.find(dep=>dep.id === id)
    setEditDistrito(newDistrito)
  }

  console.log(editDistrito)

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
            className="rounded-md shadow-md p-2 w-[250px] bg-slate-50  outline-none"
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
          <h1 className="font-medium text-xl">Todos los distritos</h1>
          <div className="flex flex-col gap-3">
            {distrits.map((dep) => (
              <div key={dep.id} className="flex gap-4 items-center border p-2 w-fit rounded-md shadow-md">
                <div className="flex flex-col w-[400px] ">
                <h1 className="text-lg"> Nombre del distrito: {dep.nombre_distrito} </h1>
                <h2 className="text-lg">Provincia: {provincias.find(el=>el.id===dep.ProvinciaId)?.nombre_provincia} </h2>
                </div>
                <button className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through" onClick={()=>handleEditDistrito(dep.id)}>Editar</button>
          
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
