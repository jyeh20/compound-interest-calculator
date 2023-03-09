import React, { useEffect, useState } from "react";

import LineChart from "../../../components/LineChart";

/**
 * @param {[Number]} timeInYears
 * @param {*} recurringContributionGenerator
 * @param {*} initialInvestmentGenerator
 */
const CompoundInterestChart = (props) => {
  const {
    timeInYears,
    recurringContributionGenerator,
    initialInvestmentGenerator,
  } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getInterest = () => {
      const recData = [];
      const initData = [];
      for (const val of recurringContributionGenerator) {
        recData.push(val.total);
      }
      for (const val of initialInvestmentGenerator) {
        initData.push(val.total);
      }
      return recData.map(
        (val, ind) => Number.parseFloat(val) + Number.parseFloat(initData[ind])
      );
    };

    setData(getInterest());
  }, [recurringContributionGenerator, initialInvestmentGenerator]);

  const getLabels = () => {
    const years = [];
    for (let year = 0; year <= Number.parseInt(timeInYears); year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <LineChart
      label="Savings"
      title="Net worth with Compound Interest"
      labelArray={getLabels()}
      dataArray={data}
    />
  );
};

export default CompoundInterestChart;
