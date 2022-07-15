import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cookie&family=Roboto:wght@100;300;400;500;700;900"
            rel="stylesheet"/>
          <link rel="icon" href="/favicon.png"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
