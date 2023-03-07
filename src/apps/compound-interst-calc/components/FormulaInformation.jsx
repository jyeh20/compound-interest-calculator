import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";

const FormulaInformation = (props) => {
  const { calculator, interestData } = props;

  const InformationPerYear = () => {
    const messages = [];
    let recurringInterest =
      calculator.generateCompoundOnRecurringContributions();
    let initialInterest = calculator.generateCompoundOnInitialInvestment();

    let rIterator = recurringInterest.next().value;
    let iIterator = initialInterest.next().value;

    // Arbitrary, could use either rIterator or iIterator
    while (rIterator) {
      messages.push(
        <div key={rIterator.year}>
          <br />
          <b>Year: {rIterator.year}</b>
          <br />
          <div>
            <div>
              Recurring Contribution: P =
              <TeX block>
                {`
                \\frac {\\frac {${interestData.recurringContribution} \\times 12}
                {${interestData.compoundRate}} \\times [(1 + \\frac
                {${interestData.interestRate}} {${interestData.compoundRate}}^
                {${interestData.compoundRate} \\times ${rIterator.year}} - 1]}
                {\\frac{${interestData.interestRate}} {${interestData.compoundRate}}}
                `}
              </TeX>
            </div>
            <div>
              Recurring Contribution: P =
              <TeX block>
                {`
                \\frac {${calculator.contributionNormalizedByRate(
                  interestData.recurringContribution,
                  interestData.compoundRate
                )}
                 \\times [{${rIterator.oneRN}} ^ {${rIterator.nt}} - 1]}
                {${rIterator.rOverN}}
                `}
              </TeX>
            </div>
            <div>
              Recurring Contribution: P = <b>${rIterator.total}</b>
            </div>
          </div>
          <br />
          <div>
            <div>
              Initial Investment: P =
              <TeX block>
                {`
                ${interestData.initialInvestment} \\times [(1 +
                \\frac {${interestData.interestRate}} {${interestData.compoundRate}}
                ) ^ {${interestData.compoundRate} \\times ${iIterator.year}}]
                `}
              </TeX>
            </div>
            <div>
              Initial Investment: P =
              <TeX block>
                {`
              ${interestData.initialInvestment} \\times
              {${iIterator.oneRN}} ^ {${iIterator.nt}}
              `}
              </TeX>
            </div>
            <div>
              Initial Investment: P = <b>${iIterator.total}</b>
            </div>
            <div>
              <b>
                Total: $
                {calculator.roundDecimal(
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
          <TeX block>{`P = INV \\times {(1 + \\frac{r}{n})} ^ {nt}`}</TeX>
        </h5>
        <div className="Interest-Calculator-formula-variables">
          Variables:
          <ul>
            <li key="Initial P">P: Your total from your initial investment</li>
            <li key="Initial investment">INV: Your initial investment</li>
            <li key="Initial interest">r: Expected interest rate</li>
            <li key="Initial compound frequency">n: The compound frequency</li>
            <li key="Initial time">t: Time (in years) you are saving</li>
          </ul>
        </div>
        <h4 className="Interest-Calculator-formula-title">
          Calculating Interest on Recurring Contributions:
        </h4>

        <h5 className="Interest-Calculator-formula">
          <TeX
            block
          >{`P = \\frac{\\frac{INV \\times 12}{n} \\times [{(1 + \\frac{r}{n})} ^ {nt} - 1]} {\\frac{r}{n}}`}</TeX>
        </h5>
        <div className="Interest-Calculator-formula-variables">
          Variables:
          <ul>
            <li key="Recurring P">P: Your total from recurring investments</li>
            <li key="Recurring investment">INV: Monthly contribution amount</li>
            <li key="Recurring interest">r: Expected interest rate</li>
            <li key="Recurring compound frequency">
              n: The compound frequency
            </li>
            <li key="Recurring time">t: Time (in years) you are saving</li>
          </ul>
          NOTE: The (INV * 12 / n) normalizes your contributions based on your
          total contributions for the year, divided by how frequently interest
          is compounded
        </div>
      </div>
      <div className="Interest-Calculator-math-report">
        <InformationPerYear />
      </div>
    </div>
  );
};

export default FormulaInformation;
