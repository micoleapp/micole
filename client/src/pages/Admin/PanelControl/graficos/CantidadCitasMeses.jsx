import React from 'react';
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CantidadCitasMeses = ({graphics}) => {
 
  const etiquetas = graphics.acumuladoMesCitas?.map((mes) => mes.mes);
  const valores = graphics.acumuladoMesCitas?.map((mes) => mes.total);

  const data = {
    labels: etiquetas,
    datasets: [
      {
        fill: true,
        label: 'Citas',
        backgroundColor: 'rgba(0, 116, 217,.2)',
        borderColor: 'rgba(0, 116, 217,.7)',
        borderWidth: 1,
        hoverBackgroundColor: '#0074D9',
        hoverBorderColor: '#0074D9',
        data: valores,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cantidad de Citas por Mes',
        font: {
          size: 16
        }
      },
    },
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default CantidadCitasMeses;
