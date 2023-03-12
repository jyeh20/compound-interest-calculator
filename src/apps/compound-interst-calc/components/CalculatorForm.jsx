import React from "react";
import Form from "react-bootstrap/Form";
import CompoundCalculator from "./calculators";

const COMPOUND_TO_TIME = {
  1: "Annually",
  12: "Monthly",
  365: "Daily",
};

const CalculatorForm = (props) => {
  const { interestData, index, setInterestDataByIndex } = props;
  const calculator = new CompoundCalculator({});

  const handleTitleChange = (e) => {
    setInterestDataByIndex(
      {
        ...interestData,
        title: e.target.value,
      },
      index
    );
  };

  const handleInitialInvestmentChange = (e) => {
    let val = e.target.value;
    if (val < 0 || val === "") {
      val = 0;
    } else {
      val = calculator.roundDecimal(val, 0);
    }
    setInterestDataByIndex(
      {
        ...interestData,
        initialInvestment: val,
      },
      index
    );
  };

  const handleRecurringContributionChange = (e) => {
    let val = e.target.value;
    if (val < 0 || val === "") {
      val = 0;
    } else {
      val = calculator.roundDecimal(val, 0);
    }
    setInterestDataByIndex(
      {
        ...interestData,
        recurringContribution: val,
      },
      index
    );
  };

  const handleInterestRateChange = (e) => {
    let val = e.target.value;
    if (val < 0 || val === "" || (val !== "" && !val.match(/\d*.?\d{0,2}/))) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }
    setInterestDataByIndex(
      {
        ...interestData,
        interestRate: val,
      },
      index
    );
  };

  const handleCompoundRateChange = (e) => {
    setInterestDataByIndex(
      {
        ...interestData,
        compoundRate: Number.parseFloat(e.target.value),
      },
      index
    );
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
    setInterestDataByIndex(
      {
        ...interestData,
        timeInYears: val,
      },
      index
    );
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formInitialInvestment">
        <Form.Label>Title</Form.Label>
        <Form.Control
          // value={interestData.title}
          onBlur={handleTitleChange}
          placeholder="Enter label name"
        />
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
  );
};

export default CalculatorForm;
