import Link from 'next/link';

import Layout from '../components/Layout';
import { authInitialProps } from '../lib/auth';

const Index = (props) => {
  return (
    <Layout title="Home" {...props}>
      <Link href="/profile">
        <a>Go to profile</a>
      </Link>
    </Layout>
  );
};

// call getInitialProps in a functional component,
// because normally is possible only in a class component
Index.getInitialProps = authInitialProps();

export default Index;