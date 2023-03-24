import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const CantidadCitasPorGrado = ({graphics}) => {
 
  const etiquetas = graphics.citasPorGrado?.map((mes) => mes.grado);
  const valores = graphics.citasPorGrado?.map((mes) => mes.total);

  const data = {
    labels: etiquetas,
    datasets: [
      {
        fill: true,
        label: 'Citas',
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(0, 116, 217, 0.8)',
          'rgba(131, 102, 193, 0.8)',
          'rgba(0, 191, 220, 0.8)',
          'rgba(195, 167, 117, 0.8)',
        ],
        hoverBorderColor: [
          'rgba(0, 116, 217, 0.8)',
          'rgba(131, 102, 193, 0.8)',
          'rgba(0, 191, 220, 0.8)',
          'rgba(195, 167, 117, 0.8)',
        ],
        data: valores,
        backgroundColor: [
          'rgba(0, 116, 217, 0.5)',
          'rgba(131, 102, 193, 0.5)',
          'rgba(0, 191, 220, 0.5)',
          'rgba(195, 167, 117, 0.5)',
        ],
        borderColor: [
          'rgba(0, 116, 217, 0.9)',
          'rgba(131, 102, 193, 0.9)',
          'rgba(0, 191, 220, 0.9)',
          'rgba(195, 167, 117, 0.9)',
        ],
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
        text: 'Cantidad de Citas por Grado',
        font: {
          size: 16
        }
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default CantidadCitasPorGrado;