import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiImageAddLine } from "react-icons/ri";
import axios from 'axios'
import Swal from "sweetalert2";

export default function PageInfraestructura() {

  const { infraestructura } = useSelector((state) => state.schools);

  const [newInfraestructura, setNewInfraestructura] = useState({
    nombre_infraestructura: "",
    imagen: "",
    categoriaId:""
  });

  const newArray = [];

    for (let i = 0; i < infraestructura?.length; i++) {
      const index = newArray.findIndex(obj => obj.InfraestructuraTipoId === infraestructura[i].InfraestructuraTipoId && obj.Infraestructura_tipo.infraestructura_tipo === infraestructura[i].Infraestructura_tipo.infraestructura_tipo);
      if (index === -1) {
        newArray.push({
          InfraestructuraTipoId: infraestructura[i].InfraestructuraTipoId,
          Infraestructura_tipo: infraestructura[i].Infraestructura_tipo
        });
      }
    }
  const [spanOne, setSpanOne] = useState(false);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

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
        setNewInfraestructura({ ...newInfraestructura, imagen: res.data.secure_url });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Algo salio mal",
          text: "Intenta nuevamente",
        });
      }
      Swal.fire({
        icon: "success",
        title: "Imagen subida correctamente",
      });
      setSpanOne(false);
    };
    console.log(newInfraestructura)
  return (
    <div className="p-5 flex flex-col gap-4 mx-[50px] ">
      <h1 className="font-lg mb-4 font-medium">Añadir nueva Infraestructura</h1>
      <form className="flex flex-col gap-4">
        <label htmlFor="nameInfraestructura" className="text-sm font-normal">
          Nombre de la infraestructura
        </label>
        <input
          type="text"
          id="nameInfraestructura"
          name="nameInfraestructura"
          className="p-2 rounded-md border-2 w-1/2 outline-none"
          value={newInfraestructura.nombre_infraestructura}
          onChange={
            (e) =>
              setNewInfraestructura({
                ...newInfraestructura,
                nombre_infraestructura: e.target.value,
              })
          }
        />
        <FormControl size="small" className="w-[250px] ">
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
            label="Selecciona una Provincia"
            className="bg-white"
            defaultValue={newInfraestructura.categoriaId}
          >
            {newArray?.map((type, index) => (
                <MenuItem value={type.InfraestructuraTipoId} key={type.index}>
                  <ListItemText primary={type.Infraestructura_tipo.infraestructura_tipo} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </form>
        <div
                className="flex gap-5 w-fit"
              >
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
                    onClick={(e) =>handleFilesSubmitImage(e)}
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
    </div>
  );
}
