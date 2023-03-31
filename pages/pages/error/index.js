import React from "react";
import Link from "next/link";
import AppConfig from "../../../layout/AppConfig";


function Error() {
  

  return (
    <div className="exception-body error">
      <img
        src={`/layout/images/logo-dark.svg`}
        alt="diamond-layout"
        className="logo"
      />

      <div className="exception-content">
        <div className="exception-title">ERROR</div>
        <div className="exception-detail">Something went wrong.</div>
        <Link href="/">Go to Dashboard</Link>
      </div>
    </div>
  );
}

Error.getLayout = function getLayout(page) {
  return (
    <React.Fragment>
      {page}
      <AppConfig minimal />
    </React.Fragment>
  );
};

export default Error;
