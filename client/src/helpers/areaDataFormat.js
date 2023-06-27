const format = (inputs) => {
  const monthNumber = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dataArea = []; // data sin formato
  const netPerMonth = Array.from({ length: 12 }, () => 0);

  // sumo los ingresos y egresos para tener el valor neto por mes
  inputs.map((input) => {
    const date = new Date(input.date);
    const month = date.getMonth();
    netPerMonth[month] += input.input;
  });

  // formateo data con los valores neto
  for (let i = 0; i < 13; i++) {
    dataArea[i] = {
      timePeriod: monthNumber[i],
      value: netPerMonth[i],
    };
  }
  return { dataArea, netPerMonth };
};
export default format;
