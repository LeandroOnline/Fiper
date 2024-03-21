const totalNeto = (inputs) => {
    let value = 0;
    inputs?.map((element) => (value += element.input));
    return value;
};
export default totalNeto;
