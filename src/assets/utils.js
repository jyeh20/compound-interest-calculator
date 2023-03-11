const getColors = (numColors, max) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(Math.floor(Math.random() * max));
  }
  return colors;
};

export { getColors };
