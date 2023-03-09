// Generator functions to calculate compound interest

const ONE = 1;
const ONE_HUNDRED = 100;
const YEAR = 12;

const CompoundCalculator = class {
  constructor(compoundObject) {
    this.recurringContribution = compoundObject.recurringContribution;
    this.initialInvestment = compoundObject.initialInvestment;
    this.interestRate = compoundObject.interestRate;
    this.compoundRate = compoundObject.compoundRate;
    this.timeInYears = compoundObject.timeInYears;
  }

  roundDecimal(num, decimalPlace = 2) {
    return Number.parseFloat(num).toFixed(decimalPlace);
  }

  interestToPercentage(interest) {
    return interest / ONE_HUNDRED;
  }

  /**
   * INV * 12 / COMP
   */
  contributionNormalizedByRate(contributionAmount, compoundRate) {
    return (contributionAmount * YEAR) / compoundRate;
  }

  /**
   * P = (INV * 12 / n) * [(1 + (r / n)) ^ nt - 1] / (r/n)
   */
  *generateCompoundOnRecurringContributions() {
    const rOverN =
      this.interestToPercentage(this.interestRate) / this.compoundRate;
    const oneRN = ONE + rOverN;

    for (let year = 0; year <= this.timeInYears; year++) {
      const nt = this.compoundRate * year;

      let total =
        (this.contributionNormalizedByRate(
          this.recurringContribution,
          this.compoundRate
        ) *
          (oneRN ** nt - ONE)) /
        rOverN;
      total = this.roundDecimal(total);
      yield {
        year,
        total,
        oneRN,
        rOverN: this.roundDecimal(rOverN, 5),
        nt,
      };
    }
  }

  /**
   * P = INV * [(1 + (r / n)) ** nt]
   */
  *generateCompoundOnInitialInvestment() {
    const oneRN =
      ONE + this.interestToPercentage(this.interestRate) / this.compoundRate;

    for (let year = 0; year <= this.timeInYears; year++) {
      const nt = this.compoundRate * year;

      let total = this.initialInvestment * oneRN ** nt;
      total = this.roundDecimal(total);
      yield {
        year,
        total,
        oneRN,
        nt,
      };
    }
  }

  recurringCompoundCalc(amount, interest, compoundRate, time) {
    const rOverN = this.interestToPercentage(interest) / compoundRate;
    const oneRN = ONE + rOverN;
    const nt = compoundRate * time;

    const total =
      (this.contributionNormalizedByRate(amount, compoundRate) *
        (oneRN ** nt - ONE)) /
      rOverN;
    return this.roundDecimal(total);
  }

  initialCompoundCalc(amount, interest, compoundRate, time) {
    const oneRN = ONE + this.interestToPercentage(interest) / compoundRate;
    const nt = compoundRate * time;
    let total = amount * oneRN ** nt;
    return this.roundDecimal(total);
  }
};

export default CompoundCalculator;
