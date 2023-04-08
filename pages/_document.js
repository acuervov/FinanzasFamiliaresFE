import React from 'react';

import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link id="theme-link" href={`/theme/theme-light/blue/theme.css`} rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div id={'globalLoader'}>
                        <div className="loader-container">
                            <div className="loader">
                                <div className="bottom-section">
                                    <div className="bottom"></div>
                                    <div className="bottom"></div>
                                    <div className="bottom"></div>
                                    <div className="bottom"></div>
                                </div>
                                <div className="top-section">
                                    <div className="bottom"></div>
                                    <div className="bottom"></div>
                                    <div className="bottom"></div>
                                    <div className="bottom"></div>
                                </div>
                                <div className="middle"></div>
                            </div>
                        </div>
                    </div>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
