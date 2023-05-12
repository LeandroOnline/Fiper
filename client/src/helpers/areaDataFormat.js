//Entrada-> inputs = [{date,detalle,input,tipo},{}]
//Salida->  {
//     "timePeriod": "2006 Q3",
//     "value": 1
//   },
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

  const data = []; // data sin formato
  const initialValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // sumo los ingresos y egresos para tener el valor neto por mes
  inputs.map((input) => {
    const date = new Date(input.date);
    const month = date.getMonth();
    initialValue[month] += input.input;
  });

  // formateo data con los valores neto
  for (let i = 0; i < 13; i++) {
    data[i] = {
      timePeriod: monthNumber[i],
      value: initialValue[i],
    };
  }
  return data;
};
export default format;
