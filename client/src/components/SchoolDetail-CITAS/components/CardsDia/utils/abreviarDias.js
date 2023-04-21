function abreviarDias(data) {
    const diasAbreviados = {
      Domingo: "Dom",
      Lunes: "Lun",
      Martes: "Mar",
      Miercoles: "Mié",
      Jueves: "Jue",
      Viernes: 'Vie',
      Miércoles: "Mié"
    };
  
    return data?.map((item) => ({
      ...item,
      dia: diasAbreviados[item.dia],
    }));
  }

  export default abreviarDias