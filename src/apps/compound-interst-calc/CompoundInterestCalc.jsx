import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const ONE = 1;
const ONE_HUNDRED = 100;
const YEAR = 12;

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

  const [showMath, setShowMath] = useState(false);

  /**
   * P = (INV * 12 / n) * [(1 + (r / n)) ^ nt - 1] / (r / n)
   */
  const calculateRecurringContributionInterest = function* () {
    const rOverN =
      interestToPercentage(interestData.interestRate) /
      interestData.compoundRate;
    const oneRN = ONE + rOverN;

    for (let year = 0; year <= interestData.timeInYears; year++) {
      const nt = interestData.compoundRate * year;

      let total =
        (contributionNormalizedByRate(
          interestData.recurringContribution,
          interestData.compoundRate
        ) *
          (oneRN ** nt - ONE)) /
        rOverN;
      total = roundDecimal(total);
      yield {
        year,
        total,
        oneRN,
        rOverN: roundDecimal(rOverN, 5),
        nt,
      };
    }
  };

  /**
   * P = INV * [(1 + (r / n)) ** nt]
   */
  const calculateInitialContributionInterest = function* () {
    const oneRN =
      ONE +
      interestToPercentage(interestData.interestRate) /
        interestData.compoundRate;

    for (let year = 0; year <= interestData.timeInYears; year++) {
      const nt = interestData.compoundRate * year;

      let total = interestData.initialInvestment * oneRN ** nt;
      total = roundDecimal(total);
      yield {
        year,
        total,
        oneRN,
        nt,
      };
    }
  };

  const roundDecimal = (num, decimalPlace = 2) => {
    return Number.parseFloat(num).toFixed(decimalPlace);
  };

  const interestToPercentage = (interest) => {
    return interest / ONE_HUNDRED;
  };

  /**
   * INV * 12 / COMP
   */
  const contributionNormalizedByRate = (contributionAmount, compoundRate) => {
    return (contributionAmount * YEAR) / compoundRate;
  };

  // const printReport = () => {
  //   const recurringInvestments = calculateRecurringContributionInterest();
  //   const initialInvestments = calculateInitialContributionInterest();

  //   for (let year = 0; year <= interestData.timeInYears; year++) {
  //     const recValue = recurringInvestments.next().value.total;
  //     const initValue = initialInvestments.next().value.total;

  //     let total = recValue + initValue;
  //     total = roundDecimal(total);
  //     console.log(
  //       `Interest in year ${year}:
  //         [
  //           Interest on contributions: ${recValue}
  //           Interest on Initial investment: ${initValue}
  //         ]
  //         Total: ${total}`
  //     );
  //   }
  // };

  const generateNewInterestChart = () => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Net worth with Compound Interest",
        },
      },
    };

    const getLabels = () => {
      const years = [];
      for (let year = 0; year <= interestData.timeInYears; year++) {
        years.push(year);
      }
      return years;
    };

    const getInterest = () => {
      const recData = [];
      const initData = [];
      for (const val of calculateRecurringContributionInterest()) {
        recData.push(val.total);
      }
      for (const val of calculateInitialContributionInterest()) {
        initData.push(val.total);
      }

      return recData.map(
        (val, ind) => Number.parseFloat(val) + Number.parseFloat(initData[ind])
      );
    };

    const getData = () => {
      return {
        labels: getLabels(),
        datasets: [
          {
            label: "Savings",
            data: getInterest(),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5",
          },
        ],
      };
    };

    return <Line options={options} data={getData()} />;
  };

  const mathInformation = () => {
    const getInformationPerYear = () => {
      const messages = [];
      let recurringInterest = calculateRecurringContributionInterest();
      let initialInterest = calculateInitialContributionInterest();

      let rIterator = recurringInterest.next().value;
      let iIterator = initialInterest.next().value;

      // Arbitrary, could use either rIterator or iTerator
      while (rIterator) {
        messages.push(
          <div>
            <br />
            <b>Year: {rIterator.year}</b>
            <br />
            <div>
              <div>
                Recurring Contribution: P = (
                {interestData.recurringContribution} x 12 /{" "}
                {interestData.compoundRate}) x [(1 + (
                {interestData.interestRate} / {interestData.compoundRate})) ^{" "}
                {interestData.compoundRate} x {rIterator.year} - 1] / (
                {interestData.interestRate} / {interestData.compoundRate})
              </div>
              <div>
                Recurring Contribution: P = (
                {contributionNormalizedByRate(
                  interestData.recurringContribution,
                  interestData.compoundRate
                )}
                ) x [{rIterator.oneRN} ^ {rIterator.nt} - 1] /{" "}
                {rIterator.rOverN}
              </div>
              <div>
                Recurring Contribution: P = <b>${rIterator.total}</b>
              </div>
            </div>
            <br />
            <div>
              <div>
                Initial Investment: P = {interestData.initialInvestment} x [(1 +
                ({interestData.interestRate} / {interestData.compoundRate}
                )) ^ ({interestData.compoundRate} * {iIterator.year})]
              </div>
              <div>
                Initial Investment: P = {interestData.initialInvestment} x (
                {iIterator.oneRN} ^ {iIterator.nt})
              </div>
              <div>
                Initial Investment: P = <b>${iIterator.total}</b>
              </div>
              <div>
                <b>
                  Total: $
                  {roundDecimal(
                    Number.parseFloat(rIterator.total) +
                      Number.parseFloat(iIterator.total)
                  )}
                </b>
              </div>
            </div>
          </div>
        );
        rIterator = recurringInterest.next().value;
        iIterator = initialInterest.next().value;
      }

      return messages;
    };

    return (
      <div>
        <h3 className="Interest-Calculator-formula-header">Formulas:</h3>
        <div>
          <h4 className="Interest-Calculator-formula-title">
            Calculating Interest on Initial Investment:
          </h4>
          <h5 className="Interest-Calculator-formula">
            P = INV x [(1 + (r / n)) ^ (n * t)]
          </h5>
          <div className="Interest-Calculator-formula-variables">
            Variables:
            <ul>
              <li>P: Your total from your initial investment</li>
              <li>INV: Your initial investment</li>
              <li>r: Expected interest rate</li>
              <li>n: The compound frequency</li>
              <li>t: Time (in years) you are saving</li>
            </ul>
          </div>
          <h4 className="Interest-Calculator-formula-title">
            Calculating Interest on Recurring Contributions:
          </h4>
          <h5 className="Interest-Calculator-formula">
            P = (INV * 12 / n) * [(1 + (r / n)) ^ (n x t) - 1] / (r / n)
          </h5>
          <div className="Interest-Calculator-formula-variables">
            Variables:
            <ul>
              <li>P: Your total from recurring investments</li>
              <li>INV: Monthly contribution amount</li>
              <li>r: Expected interest rate</li>
              <li>n: The compound frequency</li>
              <li>t: Time (in years) you are saving</li>
            </ul>
            NOTE: The (INV * 12 / n) normalizes your contributions based on your
            total contributions for the year, divided by how frequently interest
            is compounded
          </div>
        </div>
        <div className="Interest-Calculator-math-report">
          {getInformationPerYear()}
        </div>
      </div>
    );
  };

  const handleInitialInvestmentChange = (e) => {
    let val = e.target.value;
    if (val < 0 || val === "") {
      val = 0;
    } else {
      val = roundDecimal(val, 0);
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
      val = roundDecimal(val, 0);
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
      val = roundDecimal(val, 0);
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
      <header className="Interest-Calculator-header">
        Compound Interest Calculator
      </header>
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
      {generateNewInterestChart()}
      <div className="Interest-Calculator-show-math-button-container">
        <Button variant="primary" onClick={handleShowMath}>
          {showMath ? "Hide the math" : "Show the math"}
        </Button>
      </div>
      {showMath ? mathInformation() : null}
    </div>
  );
};

export default CompoundInterestCalc;
