import { typography } from "@mui/system";
const meses = {
  1: "Enero",
  2: "Febrero",
  3: "Marzo",
  4: "Abril",
  5: "Mayo",
  6: "Junio",
  7: "Julio",
  8: "Agosto",
  9: "Septiembre",
  10: "Octubre",
  11: "Noviembre",
  12: "Diciembre",
};
export default function fechaFormat(fecha) {
  console.log(fecha);
  var expresionRegular = /-/;
  let fechaArr = fecha?.split(expresionRegular).reverse();

  console.log(fechaArr);
  const separarMes = fechaArr[1].split(/0/);
  console.log(separarMes);
  const numeroMes = (fechaArr[1] = parseInt(fechaArr[1], 10).toString());
  const mes = meses[numeroMes];

  const fechaFormateada =
    fechaArr[0] + " " + "de" + " " + mes + " " + "del" + " " + fechaArr[2];
  fechaFormateada.split("    ");

  return fechaFormateada;
}
