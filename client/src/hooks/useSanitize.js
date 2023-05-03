const useSanitize = (input) => {
  return input.replace(/<(?:.|\n)*?>/gm, "");
};

export default useSanitize;
