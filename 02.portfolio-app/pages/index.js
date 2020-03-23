import Link from 'next/link';
import Layout from '../components/Layout'

const Index = () => {
  return (
    <Layout title="Home">
      <p>Welcome to the Home Page!!!</p>
      <Link href="/about">
        <a>Go to About</a>
      </Link>
    </Layout>
  );
};

export default Index;