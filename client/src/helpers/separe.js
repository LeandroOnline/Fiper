import moment from "moment";

const separe = (inputs, ingresos, egresos) => {
  inputs.map((element) => {
    if (element.input >= 0) {
      let date = moment(element.date);
      ingresos[date.month()] += element.input;
    } else {
      let date = moment(element.date);
      egresos[date.month()] += element.input * -1;
    }
  });
};

export default separe;
