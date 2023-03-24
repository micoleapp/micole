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

const AcumuladorColegiosMeses = ({ graphics }) => {
  const etiquetas = graphics.acumuladoMesColegios?.map((mes) => mes.mes);
  const valores = graphics.acumuladoMesColegios?.map((mes) => mes.total);

  const data = {
    labels: etiquetas,
    datasets: [
      {
        label: 'Colegios',
        backgroundColor: 'rgba(0, 116, 217,.5)',
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
        text: 'Acumulado de Colegios Inscritos',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
    </>
  );
};

export default AcumuladorColegiosMeses;
