const columnDataFormat = (inputs) => {
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
  // 12 (0-11) ingresos y 12 (12-23) egresos = 12 meses = 24 datos
  const totalPerMonth = Array.from({ length: 24 }, () => 0);
  
  inputs.map((input) => {
    let date = new Date(input.date);
    let month = date.getMonth();

    // sumo los ingresos y egresos por separado asignando el indice dependiendo del mes
    // totalPerMonth = [ ingresosEnero , ingresosEnero , egresosEnero, egresosEnero]
    // [...12 ingresos, ...12 egresos]

    if (input.input >= 0) {
      totalPerMonth[month] += input.input;
    } else {
      totalPerMonth[month + 12] += input.input * -1;
    }
  });

  // Formateo la data para ser leida por la grafica
  for (let i = 0; i < totalPerMonth.length; i++) {
    totalPerMonth[i] = {
      name: i < 12 ? "Ingresos" : "Egresos",
      date: i < 12 ? monthNumber[i]: monthNumber[i-12],
      value: totalPerMonth[i],
    };
  }
  return totalPerMonth;
};

export default columnDataFormat;

// La grafica esta hecha para mostrar totales pr date, sino tomara el ultimo valor

// Asi recibo los datos desde el back
// inputs = [{date,detalle,input,tipo},{}]
// asi los necesito formatear:
// {
//   name: "Ingresos",
//   月份: "Jan.",
//   月均降雨量: 18.9,
// },
