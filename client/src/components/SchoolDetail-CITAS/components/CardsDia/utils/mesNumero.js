function mesNumero(mes) {
    const meses = {
      ene: '01',
      feb: '02',
      mar: '03',
      abr: '04',
      may: '05',
      jun: '06',
      jul: '07',
      ago: '08',
      sep: '09',
      oct: '10',
      nov: '11',
      dic: '12'
    };
    return meses[mes.toLowerCase()];
  }

  export default mesNumero