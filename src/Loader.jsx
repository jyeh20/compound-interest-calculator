import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CompoundInterestCalc } from "./apps";
import { TOOLS } from "./assets/consts";

const Loader = () => {
  return (
    <Routes>
      <Route path="" element={<CompoundInterestCalc />} />
      <Route
        path={TOOLS.compoundInterestCalculator.path}
        element={<Navigate to="https://www.onetruemint.com" replace={true} />}
      />
      <Route
        path="*"
        element={<Navigate to="/compound-interest-calc" replace />}
      />
    </Routes>
  );
};

export default Loader;
