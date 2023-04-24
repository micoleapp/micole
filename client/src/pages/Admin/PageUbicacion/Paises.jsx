import React, { useEffect, useState } from "react";
import axios from "axios";
import SwalProp from "../../../exports/SwalProp";
import { useSelector, useDispatch } from "react-redux";
import { getAllPaises } from "../../../redux/SchoolsActions";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
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
function Paises() {
  const dispatch = useDispatch();
  const [pais, setPais] = React.useState(null);
  const { paises } = useSelector((state) => state.schools);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post("/paises", { nombre_pais: pais })
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito" ,
            text:"País creado!"
          });
          dispatch(getAllPaises());
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
  },[])

  const handleEdit = (id,name,e) => {
    e.preventDefault()
    try {
      axios
        .put(`/paises/${id}`, { nombre_pais: name })
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text:"País editado!"
          });
          dispatch(getAllPaises());
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
        .delete(`/paises/${id}`)
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text: "País eliminado!"
          });
          dispatch(getAllPaises());
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
    setEditPais({})
  };

  const [editPais,setEditPais] = useState({})

  const handleEditPais = (id) => {
    handleOpenModal()
    const newPais = paises.find(pais=>pais.id === id)
    setEditPais(newPais)
  }

  console.log(editPais)

  return (
    <div className="flex flex-col gap-3">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <label htmlFor="pais" className="font-medium text-xl">Crear pais</label>
          <input
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            type="text"
            id="pais"
            name="pais"
            placeholder="Introduce pais..."
            className="p-2 rounded-md shadow-md bg-slate-50 w-fit outline-none"
          />
          <button
            type="submit"
            disabled={pais === null}
            className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md disabled:bg-black/20 disabled:text-black/40 bg-[#0061dd]/20 "
          >
            Guardar
          </button>
        </form>
        <div className="flex flex-col gap-3">
          <h1 className="font-medium text-xl">Todos los paises</h1>
          <div className="flex flex-col gap-3">
            {paises.map((pais) => (
              <div key={pais.id} className="flex gap-4 items-center border-2 w-fit p-2 rounded-md shadow-md">
                <h1 className="text-xl min-w-[150px] ">{pais.nombre_pais} </h1>
                <button className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through" onClick={()=>handleEditPais(pais.id)}>Editar</button>
          
                <button className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through" onClick={(e)=>handleDelete(e,pais.id)}>Eliminar</button>
                
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
                <label htmlFor="pais" className="font-medium text-xl">Editar pais</label>
                <input
                    value={editPais.nombre_pais}
                    onChange={(e) => setEditPais({...editPais,nombre_pais:e.target.value})}
                    type="text"
                    id="pais"
                    name="pais"
                    placeholder="Introduce pais..."
                    className="p-2 rounded-md shadow-md bg-slate-50 w-fit outline-none"
                />
                <button
                    type="submit"
                    disabled={editPais.nombre_pais === ""}
                    className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md disabled:bg-black/20 disabled:text-black/40 bg-[#0061dd]/20 "
                    onClick={(e)=>handleEdit(editPais.id,editPais.nombre_pais,e)}
                >
                    Guardar
                </button>
            </form>
        </Box>
      </Modal>
    </div>
  );
}

export default Paises;
