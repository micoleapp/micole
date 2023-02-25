import { createSlice } from "@reduxjs/toolkit";

const filtrarPorRating = (productos, rating) => {
  return productos.filter((producto) => producto.rating >= rating);
};

export const schoolsSlice = createSlice({
  name: "schools",
  initialState: {
    allschools: [],
    departaments: [],
    categories: [],
    distrits: [],
    oneSchool: {},
    provincias: [],
    infraestructura: [],
    niveles: [],
    paises: [],
    error: "",
    loading: false
  },
  reducers : {
    getNiveles: (state,action) => {
      state.niveles = action.payload,
      state.loading = false,
      state.error = ""
    },
    getPaises : (state,action) => {
      state.paises = action.payload,
      state.loading = false,
      state.error = ""
    },
    getInfraestructura : (state,action) => {
      state.infraestructura = action.payload,
      state.loading = false,
      state.error = ""
    },
    getCategories : (state,action) => {
      state.categories = action.payload,
      state.loading = false,
      state.error = ""
    },
    getProvincias : (state,action) => {
      state.provincias = action.payload,
      state.loading = false,
      state.error = ""
    },
    filterByDepartament : (state,action) => {
      state.allschools = action.payload.length > 0 ? state.allschools.filter((school)=>action.payload.includes(school.Departamento.nombre_departamento)) : state.allschools,
      state.loading = false,
      state.error = ""
    },
    getDistrits: (state,action) => {
      state.distrits = action.payload,
      state.loading = false,
      state.error = ""
    },  
    getDepartaments: (state,action) => {
      state.departaments = action.payload,
      state.loading = false,
      state.error = ""
    },
    getSchools: (state,action) => {
      state.allschools = action.payload,
      state.loading = false,
      state.error = ""
    },
    getOneSchool: (state,action) => {
      state.oneSchool = action.payload,
      state.loading = false,
      state.error = ""
    },

   cleanOneSchool: (state,action) => {
      state.oneSchool = []
      state.loading = false,
      state.error = ""
    },
    getError: (state,action) => {
      state.error = action.payload,
      state.loading = false
    },
    isLoading: (state) => {
      state.loading = true
    }
  }
})

export const {getNiveles,getPaises,getInfraestructura, cleanOneSchool,getSchools,getOneSchool,getError,isLoading,getDepartaments,filterByDepartament,getDistrits,getCategories,getProvincias} = schoolsSlice.actions

export default schoolsSlice.reducer