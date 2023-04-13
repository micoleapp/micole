import { createSlice } from "@reduxjs/toolkit";

export const citasSlice = createSlice({
  name: "citas",
  initialState: {
    tasks: null,
    success: null,
    error: "",
    loading: false,
    citasUsuario:null,
    pagination:{},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Solicitud de cita",
        estado: "Solicitud",
        taskIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "Cita realizada",
        estado: "Realizada",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Aplicacion",
        estado: "Aplicacion",
        taskIds: [],
      },
      "column-4": {
        id: "column-4",
        title: "Entrevista con director",
        estado: "Entrevista",
        taskIds: [],
      },
      "column-5": {
        id: "column-5",
        title: "Vacante ofrecida",
        estado: "VOfrecida",
        taskIds: [],
      },
      "column-6": {
        id: "column-6",
        title: "Vacante aceptada",
        estado: "VAceptada",
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: [
      "column-1",
      "column-2",
      "column-3",
      "column-4",
      ,
      "column-5",
      ,
      "column-6",
    ],
  },
  reducers: {
    getCitas: (state, action) => {
      const citasActivas = action.payload.CitasActivas;
      console.log(citasActivas);
      const data = citasActivas.map((ele, index) => {
        return {
          [index]: {
            id: index,
            idCita: ele.id,
            celular: ele.telefono,
            correo: ele.email,
            date: ele.fecha_cita,
            modo: ele.modalidad,
            nombre: ele.nombre,
            time: ele.hora_cita,
            estado: ele.estado,
            añoIngreso: ele.añoIngreso,
            grado: ele.GradoId,
          },
        };
      });

      state.tasks = Object.assign({}, ...data);
      state.columns["column-1"].taskIds = data
        .filter((ele, index) => ele[index]?.estado === "Solicitud")
        .map((ele) => Object.values(ele)[0].id);
      state.columns["column-2"].taskIds = data
        .filter((ele, index) => ele[index]?.estado === "Realizada")
        .map((ele) => Object.values(ele)[0].id);
      state.columns["column-3"].taskIds = data
        .filter((ele, index) => ele[index]?.estado === "Aplicacion")
        .map((ele) => Object.values(ele)[0].id);
      state.columns["column-4"].taskIds = data
        .filter((ele, index) => ele[index]?.estado === "Entrevista")
        .map((ele) => Object.values(ele)[0].id);
      state.columns["column-5"].taskIds = data
        .filter((ele, index) => ele[index]?.estado === "VOfrecida")
        .map((ele) => Object.values(ele)[0].id);
      state.columns["column-6"].taskIds = data
        .filter((ele, index) => ele[index]?.estado === "VAceptada")
        .map((ele) => Object.values(ele)[0].id);
      (state.loading = false), (state.success = false);
      // (state.tasks = Object.assign({}, ...data)),
      // (state.columns["column-1"].taskIds = action.payload
      //     .filter((ele) => ele.estado === "Solicitud")
      //     .map((e, i) => i)),
      // (state.columns["column-2"].taskIds = action.payload
      //     .filter((ele) => ele.estado === "Realizada")
      //     .map((e, i) => i)),
      // (state.columns["column-3"].taskIds = action.payload
      //     .filter((ele) => ele.estado === "Aplicacion")
      //     .map((e, i) => i)),
      // (state.columns["column-4"].taskIds = action.payload
      //     .filter((ele) => ele.estado === "Entrevista")
      //     .map((e, i) => i)),
      // (state.columns["column-5"].taskIds = action.payload
      //     .filter((ele) => ele.estado === "VOfrecida")
      //     .map((e, i) => i)),
      //   (state.columns["column-6"].taskIds = action.payload
      //     .filter((ele) => ele.estado === "VAceptada")
      //     .map((e, i) => i));
    },
    cleanSuccess: (state, action) => {
      state.success = "";
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateColumns: (state, action) => {
      state.columns = action.payload;
    },
    getError: (state, action) => {
      (state.error = action.payload),
        (state.loading = false),
        (state.success = false);
    },
    getSuccess: (state, action) => {
      (state.success = action.payload),
        (state.loading = false),
        (state.error = false);
    },
    isLoading: (state) => {
      state.loading = true;
    },
    getCitasUsuario: (state,action) => {
      state.citasUsuario = action.payload,
      state.loading = false
    },
    getPagination: (state, action) => {
      (state.pagination = action.payload),
        (state.loading = false),
        (state.error = "");
    }
  },
});

export const {
  getCitas,
  updateTasks,
  updateColumns,
  getError,
  isLoading,
  getSuccess,
  cleanSuccess,
  getCitasUsuario,
  getPagination
} = citasSlice.actions;
export default citasSlice.reducer;
