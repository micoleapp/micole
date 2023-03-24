import React, { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RiMessage2Line,
  RiCalendar2Line,
  RiEyeLine,
  RiMailCheckLine,
} from 'react-icons/ri';
import AcumuladorColegiosMeses from './graficos/AcumuladorColegiosMeses';
import { getDataGraphicsAdmin } from '../../../redux/ReportsActions';
import CantidadCitasMeses from './graficos/CantidadCitasMeses';
import ColegiosPorPlan from './graficos/ColegiosPorPlan';
import CantidadCitasPorGrado from './graficos/CantidadCitasPorGrado';
import { CircularProgress } from '@mui/material';

function PanelControl() {
  const dispatch = useDispatch();
  const { graphics } = useSelector((state) => state.reports);
  useEffect(() => {
    dispatch(getDataGraphicsAdmin());
  }, []);
  const stats = [
    {
      id: 1,
      name: 'Solicitudes de Citas',
      stat: graphics.citasTotales || 0,
      icon: RiCalendar2Line,
    },
    {
      id: 2,
      name: 'Visitantes',
      stat: graphics.totalVisualizaciones || 0,
      icon: RiEyeLine,
    },
    {
      id: 3,
      name: 'Colegios Inscritos',
      stat: graphics.colegiosTotales || 0,
      icon: RiMailCheckLine,
    },
    {
      id: 4,
      name: 'Comentarios Nuevos',
      stat: graphics.reviewsTotales || 0,
      icon: RiMessage2Line,
    },
  ];
  if (!graphics || Object.keys(graphics).length === 0) {
    return <section className='w-full h-[80vh] flex justify-center items-center'><CircularProgress size={80} /></section>
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Hola, Enzo Medina</h1>
      <div>
        <h3 className="text-sm font-normal leading-6">
          Estos resultados son del periodo
        </h3>
        <section className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-4 md:divide-y-0 md:divide-x">
          {stats.map((item) => (
            <div key={item.name} className="px-4 py-4 sm:p-6">
              <div className="absolute rounded-full bg-[rgba(0,97,221,.1)] p-4">
                <item.icon
                  className="h-6 w-6 text-[#0061dd]"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-20 flex items-baseline">
                <p className="text-xl font-semibold text-[#0061dd]">
                  {item.stat}
                </p>
              </div>
              <p className="ml-20 truncate text-sm font-medium py-1 text-gray-700">
                {item.name}
              </p>
            </div>
          ))}
        </section>
      </div>
      <section
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
      >
        <section className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow h-[400px]">
          <div className="flex flex-1 flex-col px-8 py-4 h-full justify-center align-middle">
            <AcumuladorColegiosMeses graphics={graphics} />
          </div>
        </section>

        <section className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow h-[400px]">
          <div className="flex flex-1 flex-col px-8 py-4 h-full justify-center align-middle">
            <ColegiosPorPlan graphics={graphics} />
          </div>
        </section>

        <section className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow h-[400px]">
          <div className="flex flex-1 flex-col px-8 py-4 h-full justify-center align-middle">
            <CantidadCitasPorGrado graphics={graphics} />
          </div>
        </section>

        <section className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow h-[400px]">
          <div className="flex flex-1 flex-col px-8 py-4 h-full justify-center align-middle">
            <CantidadCitasMeses graphics={graphics} />
          </div>
        </section>
      </section>
    </div>
  );
}

export default memo(PanelControl);