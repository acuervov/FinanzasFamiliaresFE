import React, {useState} from "react";

import { useContext, useEffect } from "react";

import { LayoutContext } from "./context/layoutcontext";

const AppFooter = () => {
  const {
    layoutConfig,
  } = useContext(LayoutContext);

  
  const [logo, setLogo] = useState(() => {
    return layoutConfig.colorScheme === 'light' ? 'dark' : 'white';
  });

  return (
    <div className="layout-footer">
    <div className="footer-logo-container">
      <img src={`/layout/images/logo-${logo}.svg`} alt="diamond-layout" />
      <span className="footer-app-name">DIAMOND</span>
    </div>
    <span className="footer-copyright">&#169; Your Organization - 2023</span>
  </div>
  );
};

export default AppFooter;