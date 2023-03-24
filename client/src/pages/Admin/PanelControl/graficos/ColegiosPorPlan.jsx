import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ColegiosPorPlan = ({graphics}) => {
 
  const etiquetas = graphics.colegiosPorPlan?.map((mes) => mes.planPago);
  const valores = graphics.colegiosPorPlan?.map((mes) => mes.total);

  const data = {
    labels: etiquetas,
    datasets: [
      {
        fill: true,
        label: 'Citas',
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
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Cantidad de Colegios (Plan de Pago)',
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <div className='h-full w-full flex justify-center'>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ColegiosPorPlan;
