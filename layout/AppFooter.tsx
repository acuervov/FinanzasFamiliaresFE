'use client';

import React from 'react';

import { useContext } from 'react';

import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                <img src={`/layout/images/logonegro.png`} alt="Logo" />
                <span className="footer-app-name">Cuervo Inc</span>
            </div>
            <span className="footer-copyright">&#169; Cuervo Inc - 2024</span>
        </div>
    );
};

export default AppFooter;
