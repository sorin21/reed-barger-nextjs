import Document, { Head, Main, NextScript } from "next/document";
import { getServerSideToken, getUserScript } from '../lib/auth';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // we need context object to get the document classes props
    const props = await Document.getInitialProps(ctx);
    // console.log('ctx', ctx.req)
    const userData = await getServerSideToken(ctx.req);
    return { ...props, ...userData };
  }
  render() {
    const { user = {} } = this.props;
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          {/* to have user globally across pages */}
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
        </body>
        <style jsx>
          {`
            body {
              font-family: 'Roboto', sans-serif;
            }
          `}
        </style>
      </html>
    )
  }
}

export default MyDocument;