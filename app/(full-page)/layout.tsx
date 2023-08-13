import AppConfig from '../../layout/AppConfig';
import React from 'react';

export default function SimpleLayout({ children }) {
    return (
        <React.Fragment>
            {children}
            <AppConfig minimal />
        </React.Fragment>
    );
}
