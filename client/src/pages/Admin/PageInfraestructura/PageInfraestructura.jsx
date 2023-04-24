import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiImageAddLine } from "react-icons/ri";
import axios from "axios";
import Swal from "sweetalert2";
import SwalProp from "../../../exports/SwalProp";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import { getAllInfraestructura } from "../../../redux/SchoolsActions";
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
export default function PageInfraestructura() {
  const dispatch = useDispatch();
  const { infraestructura } = useSelector((state) => state.schools);

  const [newInfraestructura, setNewInfraestructura] = useState({
    nombre_infraestructura: "",
    imagen: "",
    categoriaId: "",
  });

  const newArray = [];

  for (let i = 0; i < infraestructura?.length; i++) {
    const index = newArray.findIndex(
      (obj) =>
        obj.InfraestructuraTipoId ===
          infraestructura[i].InfraestructuraTipoId &&
        obj.Infraestructura_tipo.infraestructura_tipo ===
          infraestructura[i].Infraestructura_tipo.infraestructura_tipo
    );
    if (index === -1) {
      newArray.push({
        InfraestructuraTipoId: infraestructura[i].InfraestructuraTipoId,
        Infraestructura_tipo: infraestructura[i].Infraestructura_tipo,
      });
    }
  }
  const [spanOne, setSpanOne] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categoria, setCategoria] = useState("");
  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  }, [file]);

  const handleFilesSubmitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("file", previewImage);
      formData.append("upload_preset", "tcotxf16");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/de4i6biay/image/upload",
        formData
      );
      setNewInfraestructura({
        ...newInfraestructura,
        imagen: res.data.secure_url,
      });
    } catch (error) {
      console.log(error);
      SwalProp({
        status: false,
        title: "Algo salió mal",
        text: "Intenta nuevamente",
      });
    }
    SwalProp({
      status: true,
      title: "Éxito",
      text: "Imagen subida!"
    });
    setSpanOne(false);
  };
  const handleSubmitInfra = (e) => {
    e.preventDefault();
    try {
      axios
        .post("/infraestructuras", newInfraestructura)
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito" ,
            text: "Infraestructura creada!"
          });
          setNewInfraestructura({
            nombre_infraestructura: "",
            imagen: "",
            categoriaId: "",
          });
          dispatch(getAllInfraestructura());

          setSpanOne(false);
          setFile(null);
          setPreviewImage(null);
        })
        .catch((err) => {
          SwalProp({
            status: false ,
            title: "Algo salió mal",
            text: err.response.data.message,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const disabledInfra = () => {
    if (
      newInfraestructura.nombre_infraestructura === "" ||
      newInfraestructura.imagen === "" ||
      newInfraestructura.categoriaId === ""
    ) {
      return true;
    }
    return false;
  };

  const handleDeleteInfra = (id) => {
    try {
      Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertir esto!",
        icon: "warning",
        showDenyButton: true,
        confirmButtonText: "Si, eliminar!",
        denyButtonText: `No`,
      }).then((res) => {
        if (res.isConfirmed) {
          axios
            .delete("/infraestructuras/" + id)
            .then((res) => {
              SwalProp({
                status: true,
                title: "Éxito",
                text:"Infraestructura eliminada!"
              });
              dispatch(getAllInfraestructura());
            })
            .catch((err) => {
              SwalProp({
                status: false,
                title: "Algo salió mal",
                text: err.response.data.message,
              });
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const getElementsForPage = (
    elements,
    page,
    itemsPerPage,
    searchTerm,
    categoria
  ) => {
    let filteredElements = filterElements(elements, searchTerm);
    if (categoria) {
      filteredElements = filteredElements.filter(
        (element) => element.InfraestructuraTipoId === categoria
      );
    }
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredElements.slice(start, end);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filterElements = (elements, searchTerm) => {
    return elements.filter((element) =>
      element.nombre_infraestructura
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  };
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setEditedInfra({});
    setSuccesEditImage(false);
    setOpenModal(false);
    setHand(false);

  };
  const handleEditInfra = (id) => {
    handleOpenModal();
    const newInfra = infraestructura.find((infra) => infra.id === id);
    setEditedInfra({
      id: newInfra.id,
      nombre_infraestructura: newInfra.nombre_infraestructura,
      imagen: newInfra.imagen,
      categoriaId: newInfra.InfraestructuraTipoId,
    });
  };

  const [editedInfra, setEditedInfra] = useState({
    id: "",
    nombre_infraestructura: "",
    imagen: "",
    categoriaId: "",
  });

  const [previewEdit, setPreviewEdit] = useState(null);
  const [hand, setHand] = useState(false);
  const [succesEditImage, setSuccesEditImage] = useState(false);

  const handleFilesSubmitEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("file", previewEdit);
      formData.append("upload_preset", "tcotxf16");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/de4i6biay/image/upload",
        formData
      );
      setEditedInfra({ ...editedInfra, imagen: res.data.secure_url });
      setHand(false);
      setSuccesEditImage(true);
    } catch (error) {
      console.log(error);
    }
    setSpanOne(false);
  };

  const [fileEdit, setFileEdit] = useState(null);

  useEffect(() => {
    if (fileEdit !== null) {
      const reader = new FileReader();
      reader.readAsDataURL(fileEdit);
      reader.onloadend = () => {
        setPreviewEdit(reader.result);
        setHand(true);
      };
    }
  }, [fileEdit]);

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    try {
      axios
        .put("/infraestructuras/" + editedInfra.id, editedInfra)
        .then((res) => {
          SwalProp({
            status: true,
            title: "Éxito",
            text:"Infraestructura editada!"
          });
          dispatch(getAllInfraestructura());
          setHand(false);
          setSpanOne(false);
          setSuccesEditImage(false);
          handleCloseModal();
        })
        .catch((err) => {
          SwalProp({
            status: false,
            title: "Algo salió mal",
            text: err.response.data.message,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 flex flex-col gap-4 mx-[50px] ">
      <>
        <h1 className="font-lg mb-4 font-medium">
          Añadir nueva Infraestructura
        </h1>
        <form className="flex flex-col gap-4">
          <label htmlFor="nameInfraestructura" className="text-sm font-normal">
            Nombre de la infraestructura
          </label>
          <input
            type="text"
            id="nameInfraestructura"
            name="nameInfraestructura"
            className="p-2 rounded-md border-2 lg:w-1/2 outline-none"
            value={newInfraestructura.nombre_infraestructura}
            onChange={(e) =>
              setNewInfraestructura({
                ...newInfraestructura,
                nombre_infraestructura: e.target.value,
              })
            }
          />
          <FormControl size="small" className="lg:w-[250px]" variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Selecciona una categoria
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={newInfraestructura.categoriaId}
              onChange={(e) => {
                setNewInfraestructura({
                  ...newInfraestructura,
                  categoriaId: e.target.value,
                });
              }}
              defaultValue={newInfraestructura.categoriaId}
            >
              {newArray?.map((type, index) => (
                <MenuItem value={type.InfraestructuraTipoId} key={type.index}>
                  <ListItemText
                    primary={type.Infraestructura_tipo.infraestructura_tipo}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
        <div className="flex gap-5 w-fit">
          <div className="file-select flex flex-col w-full lg:min-w-[200px] ">
            <label
              htmlFor="image"
              className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
            >
              <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
              <span className="text-sm mx-auto text-center text-[#0061dd]">
                Agregar imagen
              </span>{" "}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/png,image/jpeg"
              onChange={(e) => {
                setSpanOne(true);
                setFile(e.target.files[0]);
              }}
              className="hidden"
            />
            {file !== null && (
              <button
                type="button"
                onClick={(e) => handleFilesSubmitImage(e)}
                disabled={previewImage == null}
                className="p-2 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white rounded-b-md"
              >
                Upload
              </button>
            )}

            {spanOne && (
              <span className="relative text-center animate-bounce text-3xl">
                👆
              </span>
            )}
          </div>
          {previewImage !== null && (
            <img
              src={previewImage}
              alt=""
              className="object-cover w-[150px] h-[150px] rounded-md"
            />
          )}
        </div>
        <button
          type="button"
          disabled={disabledInfra()}
          onClick={(e) => handleSubmitInfra(e)}
          className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md disabled:bg-black/20 disabled:text-black/40 bg-[#0061dd]/20 "
        >
          Agregar infraestructura
        </button>
      </>
      <div className="mt-4">
        <h1 className="font-lg mb-4 font-medium">Todas las infraestructuras</h1>
        <div className="flex justify-between flex-col lg:flex-row items-center">
          <div className="flex items-center bg-white w-fit rounded-md h-min">
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Buscar infraestructura.."
              class="p-2 outline-none rounded-md lg:w-[400px]"
              value={searchTerm}
              onChange={handleSearch}
            />
            <label htmlFor="search">
              <AiOutlineSearch className="text-xl mr-3 cursor-pointer" />
            </label>
          </div>
          <FormControl
            variant="standard"
            style={{ width: "200px", height: "70px" }}
            size="small"
          >
            <InputLabel id="demo-simple-select-standard-label">
              Filtrar por
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-type-select-standard"
              value={categoria}
              onClick={() => setPage(1)}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <MenuItem value="" key="all">
                <ListItemText primary="Todos" />
              </MenuItem>
              {newArray.map((type, index) => (
                <MenuItem value={type.InfraestructuraTipoId} key={index}>
                  <ListItemText
                    primary={type.Infraestructura_tipo.infraestructura_tipo}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex flex-col gap-4">
          {getElementsForPage(
            infraestructura,
            page,
            itemsPerPage,
            searchTerm,
            categoria
          )?.map((infra, index) => (
            <div
              className="flex flex-col gap-4 bg-white p-5 rounded-md shadow-md"
              key={index}
            >
              <div className="flex justify-around flex-col lg:flex-row gap-4 items-center">
                <div className="flex flex-col lg:flex-row items-center gap-4">
                  <img
                    src={infra.imagen}
                    alt=""
                    className="object-cover w-[80px] h-[80px] rounded-md"
                  />
                  <div className="flex flex-col gap-2 lg:w-[300px] items-center">
                    <h2>Nombre infraestructura</h2>
                    <h1 className="font-medium text-center">
                      {infra.nombre_infraestructura}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2 lg:w-[300px] items-center">
                    <h2>Categoria</h2>
                    <h1 className="font-medium text-center">
                      {infra.Infraestructura_tipo.infraestructura_tipo}
                    </h1>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => handleDeleteInfra(infra.id)}
                    className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through"
                  >
                    Eliminar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditInfra(infra.id)}
                    className="p-2 flex font-medium mx-auto lg:mx-0 w-fit text-[#0061dd] rounded-md bg-[#0061dd]/20 disabled:line-through"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
          <Pagination
            count={Math.ceil(
              filterElements(infraestructura, searchTerm).filter((element) =>
                categoria ? element.InfraestructuraTipoId === categoria : true
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
        <Box sx={styleModal} className="flex flex-col gap-10">
          <form className="flex flex-col gap-4">
            <label
              htmlFor="nameInfraestructura"
              className="text-sm font-normal"
            >
              Nombre de la infraestructura
            </label>
            <input
              type="text"
              id="nameInfraestructura"
              name="nameInfraestructura"
              className="p-2 rounded-md border-2 outline-none"
              value={editedInfra.nombre_infraestructura}
              onChange={(e) =>
                setEditedInfra({
                  ...editedInfra,
                  nombre_infraestructura: e.target.value,
                })
              }
            />
            <FormControl size="small" className="w-[250px] " variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Selecciona una categoria
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-type-select-standard"
                value={editedInfra.categoriaId}
                onChange={(e) => {
                  setEditedInfra({
                    ...editedInfra,
                    categoriaId: e.target.value,
                  });
                }}
                defaultValue={editedInfra.categoriaId}
              >
                <MenuItem></MenuItem>
                {newArray?.map((type, index) => (
                  <MenuItem value={type.InfraestructuraTipoId} key={type.index}>
                    <ListItemText
                      primary={type.Infraestructura_tipo.infraestructura_tipo}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          <form onSubmit={handleFilesSubmitEdit} className="flex flex-col">
            <div className="file-select flex w-full lg:min-w-[200px] ">
              <label
                htmlFor="imageEdit"
                className="bg-white cursor-pointer p-5 w-full h-full shadow-md flex justify-center flex-col items-center rounded-t-md"
              >
                <RiImageAddLine className="text-7xl text-[#0061dd] group-focus:text-white group-hover:text-white" />
                <span className="text-sm mx-auto text-center text-[#0061dd]">
                  Modificar imagen
                </span>{" "}
              </label>
              <input
                type="file"
                id="imageEdit"
                name="imageEdit"
                accept="image/png,image/jpeg"
                onChange={(e) => {
                  setFileEdit(e.target.files[0]);
                }}
                className="hidden"
              />
            </div>
            {hand && (
              <button
                type="submit"
                disabled={previewEdit == null}
                className="p-2 bg-[#0061dd] disabled:bg-[#0061dd]/50 text-white rounded-b-md"
              >
                Upload
              </button>
            )}

            {hand && (
              <span className="relative text-center animate-bounce text-3xl">
                👆
              </span>
            )}

            <img
              src={editedInfra.imagen}
              alt=""
              className="object-cover mt-5 rounded-md h-[100px] w-[100px] mx-auto"
            />
            {succesEditImage && (
              <span className="text-green-500 text-sm text-center mt-5">
                Imagen modificada con exito
              </span>
            )}
          </form>
          <button
            onClick={(e) => handleSubmitEdit(e)}
            className="p-2 mt-2 mx-auto w-fit bg-[#0061dd] text-white rounded-md disabled:bg-[#0061dd]/40"
          >
            Modificar infraestructura
          </button>
        </Box>
      </Modal>
    </div>
  );
}
