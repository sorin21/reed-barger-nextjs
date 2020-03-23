import Layout from '../components/Layout';

const Error = ({ statusCode }) => {
  return (
    <Layout title="Error!!!">
      {statusCode ? `Couldn't get that fetch data: Status code: ${statusCode}` : `Couldn't get that page, sorry!`}
    </Layout>
  );
};

export default Error;