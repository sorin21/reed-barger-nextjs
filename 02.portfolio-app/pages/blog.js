import Layout from '../components/Layout';
import Link from 'next/link';

const PostLink = ({ title }) => (
  <li>
    <Link href={`/post?title=${title}`}>
      <a>{title}</a>
    </Link>
  </li>
);

const Blog = () => {
  return (
    <Layout title="My Blog">
      <ul>
        <PostLink title="React" />
        <PostLink title="Angular" />
        <PostLink title="Vue" />
      </ul>
    </Layout>
  );
};

export default Blog;