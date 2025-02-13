import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className=" items-center justify-between mb-5">
        <h1 className="font-bold text-6xl gradient-title">Industry Insights</h1>
        {/* <Suspense fallback={<BarLoader className="mt-4" width={"100%"} />}> */}
          {children}
        {/* </Suspense> */}
      </div>
    </div>
  );
};

export default Layout;
