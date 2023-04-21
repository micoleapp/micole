function generarCalendario() {
  const fecha = new Date(); // Creamos una instancia de la fecha actual
  const anio = fecha.getFullYear(); // Obtenemos el año actual
  const mes = fecha.getMonth(); // Obtenemos el mes actual
  const dia = fecha.getDate(); // Obtenemos el día actual
  
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']; // Array con los días de la semana abreviados
  const mesesAbreviados = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']; // Array con los meses abreviados
  
  const calendario = []; // Array donde almacenaremos el calendario
  
  // Agregamos los días del mes al calendario a partir del día actual
  for (let i = dia; i <= dia + 29; i++) {
    const fechaActual = new Date(anio, mes, i); // Creamos una instancia de la fecha actual del día
    const diaSemana = diasSemana[fechaActual.getDay()]; // Obtenemos el día de la semana correspondiente a la fecha actual
    if (fechaActual.getMonth() === mes) { // Si el día pertenece al mes actual, lo agregamos al calendario
      calendario.push({ diaSemana, mes: mesesAbreviados[mes], dia: i });
    } else { // Si el día no pertenece al mes actual, agregamos un objeto con la información deseada
      const mesSiguiente = (mes + 1) % 12; // Obtenemos el mes siguiente, teniendo en cuenta el cambio de año
      const diaSiguiente = i - new Date(anio, mesSiguiente, 0).getDate(); // Obtenemos el número de días que hay en el mes siguiente y lo restamos al día actual para obtener el día del mes siguiente
      calendario.push({ diaSemana, mes: mesesAbreviados[mesSiguiente], dia: diaSiguiente });
    }
  }
  
  // Agregamos los días de la semana del mes actual al principio del array
  for (let i = diasSemana.indexOf(diasSemana[fecha.getDay()]); i < diasSemana.length; i++) {
    calendario.unshift({ diaSemana: diasSemana[i], mes: '', dia: '' });
  }
  
  // Agregamos los días de la semana del mes anterior al principio del array
  const fechaMesAnterior = new Date(anio, mes, 0);
  for (let i = diasSemana.indexOf(diasSemana[fechaMesAnterior.getDay()]); i >= 0; i--) {
    calendario.unshift({ diaSemana: diasSemana[i], mes: '', dia: '' });
  }
  
  return calendario.slice(diasSemana.indexOf(diasSemana[fecha.getDay()])); // Devolvemos solo los días a partir del día actual
}



export  default generarCalendario