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

const formatNumberStringWithCommas = (dollarAmount) => {
  if (!dollarAmount) {
    return "";
  }
  const amountSplitAtDecimal = dollarAmount.split(".");
  let decimal = [];
  if (amountSplitAtDecimal.length === 2) {
    // Cents
    decimal = amountSplitAtDecimal[1].split("");

    // Add trailing zeros
    while (decimal.length < 2) {
      decimal.push("0");
    }
  } else {
    while (decimal.length < 2) {
      decimal.push("0");
    }
  }
  // Dollar amount
  let left = amountSplitAtDecimal[0].split("").reverse();
  // Add commas
  let newDollarAmount = [];
  for (let i = 0; i < left.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      newDollarAmount.push(",");
    }
    newDollarAmount.push(left[i]);
  }

  newDollarAmount = newDollarAmount.reverse().join("");
  decimal = decimal.join("");

  return [newDollarAmount, decimal].join(".");
};

export { getColors, getMint, getMintVariant, formatNumberStringWithCommas };
