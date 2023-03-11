import React, { useEffect, useState } from "react";

import LineChart from "../../../components/LineChart";

/**
 * @param {[Number]} timeInYears
 * @param {*} recurringContributionGenerator
 * @param {*} initialInvestmentGenerator
 */
const CompoundInterestChart = (props) => {
  const { interestDataArr, calculators } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getInterest = (index) => {
      const calculator = calculators[index];
      const recData = [];
      const initData = [];
      for (const val of calculator.generateCompoundOnRecurringContributions()) {
        recData.push(val.total);
      }
      for (const val of calculator.generateCompoundOnInitialInvestment()) {
        initData.push(val.total);
      }
      const dataArray = recData.map(
        (val, ind) => Number.parseFloat(val) + Number.parseFloat(initData[ind])
      );
      const label = interestDataArr[index].title;
      let rgb = interestDataArr[index].colors;
      const borderColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      const backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`;
      return {
        dataArray,
        label,
        borderColor,
        backgroundColor,
      };
    };

    setData(calculators.map((_, i) => getInterest(i)));
  }, [calculators, interestDataArr]);

  const getLabels = () => {
    const years = [];
    for (
      let year = 0;
      year <=
      Number.parseInt(Math.max(...interestDataArr.map((e) => e.timeInYears)));
      year++
    ) {
      years.push(year);
    }
    return years;
  };

  return (
    <LineChart
      label="Savings"
      title="Net worth with Compound Interest"
      labelArray={getLabels()}
      data={data}
    />
  );
};

export default CompoundInterestChart;
