const columnDataFormat = (inputs) => {
  const data = [0,0,0,0,0,0,0,0,0,0,0,0,0];
  inputs.map((input) => {
    const datee = new Date(input.date);
    let month = datee.getMonth();
    console.log(month);
    data[month] = {
      name: input.tipo, // Sumar los ingresos y egresoos por separado y luego devolver un data = [ingresos,egresos] , sumados por fecha por ej: data = [ ingresosMayo , egresosMayo , ingresosJunio, egresosJunio] para formatearlo correctamente
      date: month,
      value: input.input < 0 ? input.input * -1 : input.input,
    };
  });

  return data;
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
