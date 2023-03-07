import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import CompoundCalculator from "./components/calculators";
import CompoundInterestChart from "./components/CompoundInterestChart";
import FormulaInformation from "./components/FormulaInformation";

const COMPOUND_TO_TIME = {
  1: "Annually",
  12: "Monthly",
  365: "Daily",
};

const CompoundInterestCalc = () => {
  const [interestData, setInterestData] = useState({
    initialInvestment: 1000,
    recurringContribution: 0,
    interestRate: 3.75,
    compoundRate: 12,
    timeInYears: 5,
  });
  const [calculator, setCalculator] = useState(
    new CompoundCalculator(interestData)
  );
  const [showMath, setShowMath] = useState(false);

  useEffect(() => {
    setCalculator(new CompoundCalculator(interestData));
  }, [interestData, setInterestData]);

  const handleInitialInvestmentChange = (e) => {
    let val = e.target.value;
    if (val < 0 || val === "") {
      val = 0;
    } else {
      val = calculator.roundDecimal(val, 0);
    }
    setInterestData({
      ...interestData,
      initialInvestment: val,
    });
  };

  const handleRecurringContributionChange = (e) => {
    let val = e.target.value;
    if (val < 0 || val === "") {
      val = 0;
    } else {
      val = calculator.roundDecimal(val, 0);
    }
    setInterestData({
      ...interestData,
      recurringContribution: val,
    });
  };

  const handleInterestRateChange = (e) => {
    let val = e.target.value;
    if (val < 0 || val === "" || (val !== "" && !val.match(/\d*.?\d{0,2}/))) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    setInterestData({
      ...interestData,
      interestRate: val,
    });
  };

  const handleCompoundRateChange = (e) => {
    setInterestData({
      ...interestData,
      compoundRate: Number.parseFloat(e.target.value),
    });
  };

  const handleTimeChange = (e) => {
    let val = e.target.value;
    if (val < 0 || val === "") {
      val = 0;
    } else if (val > 99) {
      val = 99;
    } else if (val !== "") {
      val = calculator.roundDecimal(val, 0);
    }
    setInterestData({
      ...interestData,
      timeInYears: val,
    });
  };

  const handleShowMath = () => {
    setShowMath(!showMath);
  };

  return (
    <div>
      <header className="Tool-Header">Compound Interest Calculator</header>
      <Form>
        <Form.Group className="mb-3" controlId="formInitialInvestment">
          <Form.Label>Initial Investment</Form.Label>
          <Form.Control
            type="number"
            inputMode="numeric"
            step="1"
            value={interestData.initialInvestment}
            onChange={handleInitialInvestmentChange}
            placeholder="Enter Investment Amount"
          />
          <Form.Text className="text-muted">
            The amount of your initial investment
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRecurringContribution">
          <Form.Label>Recurring Contributions</Form.Label>
          <Form.Control
            type="number"
            inputMode="numeric"
            step="1"
            value={interestData.recurringContribution}
            onChange={handleRecurringContributionChange}
            placeholder="Enter Recurring Contribution Amount"
          />
          <Form.Text className="text-muted">
            How much you plan to contribute to savings each month
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formInterestRate">
          <Form.Label>Expected Interest Rate</Form.Label>
          <Form.Control
            type="text"
            inputMode="decimal"
            step="0.01"
            min="0"
            max="100"
            value={interestData.interestRate}
            onChange={handleInterestRateChange}
            placeholder="Enter Interest Rate"
          />
          <Form.Text className="text-muted">
            Expected amount of returns on your investments
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCompoundRate">
          <Form.Label>Compound Frequency</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={interestData.compoundRate}
            onChange={handleCompoundRateChange}
          >
            {Object.entries(COMPOUND_TO_TIME).map(([key, val]) => (
              <option key={key} value={key}>
                {val}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">
            How often your interest will compound per year
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTimeInYears">
          <Form.Label>Time (In Years)</Form.Label>
          <Form.Control
            type="number"
            step="1"
            inputMode="numeric"
            value={interestData.timeInYears}
            onChange={handleTimeChange}
            placeholder="Enter Time in Years"
          />
          <Form.Text className="text-muted">
            How long you plan on saving
          </Form.Text>
        </Form.Group>
      </Form>
      <CompoundInterestChart
        timeInYears={interestData.timeInYears}
        recurringContributionGenerator={calculator.generateCompoundOnRecurringContributions()}
        initialInvestmentGenerator={calculator.generateCompoundOnInitialInvestment()}
      />
      <div className="Interest-Calculator-show-math-button-container">
        <Button variant="primary" onClick={handleShowMath}>
          {showMath ? "Hide the math" : "Show the math"}
        </Button>
      </div>
      {showMath ? (
        <FormulaInformation
          calculator={calculator}
          interestData={interestData}
        />
      ) : null}
    </div>
  );
};

export default CompoundInterestCalc;
