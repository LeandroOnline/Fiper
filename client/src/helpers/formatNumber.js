export default function formatNumber(numero) {
  if (numero >= 1000000) {
    return (numero / 1000000).toFixed(1) + " M";
  } else if (numero >= 1000) {
    return (numero / 1000).toFixed(0) + " m";
  } else {
    return numero.toString();
  }
}
