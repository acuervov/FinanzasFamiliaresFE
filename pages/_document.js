import React from "react";

import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    

    return (
      <Html lang="en">
        <Head>
          <link
            id="theme-link"
            href={`/theme/theme-light/blue/theme.css`}
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          <div className="layout-preloader-container">
            <div className="layout-preloader">
              <span></span>
            </div>
          </div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
