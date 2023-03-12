import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  CalculatorForm,
  CompoundCalculator,
  FormulaInformation,
  CompoundInterestChart,
  CalculatorTotal,
} from "./components";
import { getColors } from "../../assets/utils";

const getNewCalculator = () => {
  return {
    title: "Compound Calculator",
    initialInvestment: 0,
    recurringContribution: 1000,
    interestRate: 8,
    compoundRate: 1,
    timeInYears: 35,
    colors: getColors(3, 255),
  };
};

const CompoundInterestCalcCompare = () => {
  const [interestData, setInterestData] = useState([
    {
      title: "Average Joe",
      initialInvestment: 0,
      recurringContribution: 1000,
      interestRate: 0,
      compoundRate: 1,
      timeInYears: 35,
      colors: getColors(3, 255),
    },
    {
      title: "Mint Mike",
      initialInvestment: 0,
      recurringContribution: 1000,
      interestRate: 8,
      compoundRate: 1,
      timeInYears: 35,
      colors: getColors(3, 255),
    },
  ]);
  const [calculators, setCalculators] = useState(
    interestData.map((e) => new CompoundCalculator(e))
  );
  const [showMath, setShowMath] = useState(false);
  const [calculatorForms, setCalculatorForms] = useState(
    <div className="Interest-Calculator-forms">
      <CalculatorForm interestData={[]} />
      <CalculatorTotal interestData={[]} />
    </div>
  );

  useEffect(() => {
    const setInterestDataByIndex = (newInterestData, index) => {
      let interestDataCopy = [...interestData];
      interestDataCopy[index] = newInterestData;
      setInterestData(interestDataCopy);
    };

    setCalculators(interestData.map((e) => new CompoundCalculator(e)));
    setCalculatorForms(
      interestData.map((e, i) => (
        <div
          className="Interest-Calculator-forms"
          key={`Interest-Calculator-Forms ${i}`}
        >
          <CalculatorForm
            interestData={e}
            index={i}
            setInterestDataByIndex={setInterestDataByIndex}
          />
          <CalculatorTotal interestData={e} />
        </div>
      ))
    );
  }, [interestData]);

  const AddCalculator = () => {
    return (
      <Button
        variant="primary"
        disabled={interestData.length > 1}
        onClick={handleAddCompare}
      >
        Add another calculator!
      </Button>
    );
  };

  const RemoveCalculator = () => {
    return (
      <Button
        variant="primary"
        disabled={interestData.length === 1}
        onClick={handleRemoveCompare}
      >
        Remove a calculator!
      </Button>
    );
  };

  const handleShowMath = () => {
    setShowMath(!showMath);
  };

  const handleAddCompare = () => {
    setInterestData([...interestData, getNewCalculator()]);
  };

  const handleRemoveCompare = () => {
    const newInterestData = [...interestData];
    newInterestData.pop();
    const newCalculators = [...calculators];
    newCalculators.pop();
    setCalculators(newCalculators);
    setInterestData(newInterestData);
  };

  return (
    <div className="Compound-Interest-Calculator">
      <header className="Tool-Header-text">
        Mint's Compound Interest Calculator
      </header>
      <div className="Interest-Calculator-forms-container">
        {calculatorForms}
      </div>

      <div className="Interest-Calculator-button-container">
        <RemoveCalculator />
        <AddCalculator />
      </div>
      <CompoundInterestChart
        interestDataArr={interestData}
        calculators={calculators}
      />
      <div className="Interest-Calculator-button-container">
        {interestData.length === 1 ? (
          <div>
            <Button variant="primary" onClick={handleShowMath}>
              {showMath ? "Hide the math" : "Show the math"}
            </Button>
          </div>
        ) : null}
        <RemoveCalculator />
        <AddCalculator />
      </div>
      {showMath ? (
        <FormulaInformation
          calculator={calculators[0]}
          interestData={interestData[0]}
        />
      ) : null}
    </div>
  );
};

export default CompoundInterestCalcCompare;
