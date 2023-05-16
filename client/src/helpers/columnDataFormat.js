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

  const totalPerMonth = Array.from({ length: 24 }, () => 0);
  const profits = Array.from({ length: 12 }, () => 0);
  const losses = Array.from({ length: 12 }, () => 0);

  inputs.map((input) => {
    let date = new Date(input.date);
    let month = date.getMonth();

    if (input.input >= 0) {
      totalPerMonth[month] += input.input;
      profits.push(input.input);
    } else {
      totalPerMonth[month + 12] += input.input * -1;
    }
  });

  // Formateo la data para ser leida por la grafica
  for (let i = 0; i < totalPerMonth.length; i++) {
    totalPerMonth[i] = {
      name: i < 12 ? "Ingresos" : "Egresos",
      date: i < 12 ? monthNumber[i] : monthNumber[i - 12],
      value: totalPerMonth[i],
    };
  }
  return totalPerMonth;
};

export default columnDataFormat;
