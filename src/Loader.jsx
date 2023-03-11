import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CompoundInterestCalc, CompoundInterestCalcCompare } from "./apps";
import { EXAMPLES, TOOLS } from "./assets/consts";

const Loader = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <Navigate
            to={`https://www.onetruemint.com${TOOLS.compoundInterestCalculator.path}`}
            replace={true}
          />
        }
      />
      <Route
        path={TOOLS.compoundInterestCalculator.path}
        element={<CompoundInterestCalc />}
      />
      <Route
        path={EXAMPLES.compoundInterestCalculatorCompare.path}
        element={<CompoundInterestCalcCompare />}
      />
      <Route
        path="*"
        element={
          <Navigate to={TOOLS.compoundInterestCalculator.path} replace />
        }
      />
    </Routes>
  );
};

export default Loader;
