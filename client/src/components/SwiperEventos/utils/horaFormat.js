export default function es_AM_PM(hora) {
 
    let tiempo = hora?.split(":");
    let horas = parseInt(tiempo[0]);
    let minutos = parseInt(tiempo[1]);
    let segundos = parseInt(tiempo[2]);
    
  
    if (horas > 12) {
      return   "PM";
    }
 
    else if (horas === 12 && minutos === 0 && segundos === 0) {
      return   "PM";
    }

    else if (horas === 0) {
      return  "AM";
    }
 
    else {
      return "AM";
    }
  }
  