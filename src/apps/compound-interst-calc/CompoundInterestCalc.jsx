import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  CalculatorForm,
  CompoundCalculator,
  FormulaInformation,
  CompoundInterestChart,
  CalculatorTotal,
} from "../components";
import { getMint, getMintVariant } from "../../assets/utils";

const getNewCalculator = (color = undefined) => {
  return {
    title: "Compound Calculator",
    initialInvestment: 0,
    recurringContribution: 1000,
    interestRate: 8,
    compoundRate: 1,
    timeInYears: 35,
    colors: color || getMintVariant(),
  };
};

const CompoundInterestCalc = () => {
  const [interestData, setInterestData] = useState([
    getNewCalculator(getMint()),
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

  const calculatorButtons = new Map([
    [
      "add",
      <Button
        variant="primary"
        disabled={interestData.length > 4}
        onClick={handleAddCompare}
      >
        Add another calculator!
      </Button>,
    ],
    [
      "remove",
      <Button
        variant="primary"
        disabled={interestData.length === 1}
        onClick={handleRemoveCompare}
      >
        Remove a calculator!
      </Button>,
    ],
  ]);

  const InterestCalculatorButton = (props) => {
    const { element } = props;

    return <div className="Interest-Calculator-button">{element}</div>;
  };

  const CalculatorButton = (props) => {
    const { dispatch } = props;
    return (
      <InterestCalculatorButton element={calculatorButtons.get(dispatch)} />
    );
  };

  return (
    <div className="Compound-Interest-Calculator">
      <header className="Tool-Header-text">
        Mint's Compound Interest Calculator
      </header>
      <div className="Interest-Calculator-body">
        <div className="Interest-Calculator-forms-container">
          {calculatorForms}
        </div>

        <div className="Interest-Calculator-button-container">
          <CalculatorButton dispatch="remove" />
          <CalculatorButton dispatch="add" />
        </div>

        <div className="Interest-Calculator-chart-container">
          <CompoundInterestChart
            interestDataArr={interestData}
            calculators={calculators}
          />
        </div>

        <div className="Interest-Calculator-button-container">
          <CalculatorButton dispatch="remove" />
          {interestData.length === 1 ? (
            <div>
              <Button variant="primary" onClick={handleShowMath}>
                {showMath ? "Hide the math" : "Show the math"}
              </Button>
            </div>
          ) : null}
          <CalculatorButton dispatch="add" />
        </div>
      </div>
      <div className="Interest-Calculator-formula-info">
        {showMath ? (
          <FormulaInformation
            calculator={calculators[0]}
            interestData={interestData[0]}
          />
        ) : null}
      </div>
    </div>
  );
};

export default CompoundInterestCalc;
