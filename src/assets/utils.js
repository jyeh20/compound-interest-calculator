const getColors = (numColors, max) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(Math.floor(Math.random() * max));
  }
  return colors;
};

const getMint = () => {
  return [214, 244, 238].map((e) => e - 20);
};

const getMintVariant = () => {
  const multiplier = Math.floor(Math.random() * -100);
  const mintVariant = getMint().map((e) => e + multiplier);
  return mintVariant;
};

export { getColors, getMint, getMintVariant };
