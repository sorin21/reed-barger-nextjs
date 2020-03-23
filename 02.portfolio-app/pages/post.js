import Layout from '../components/Layout';

const Post = ({ url }) => {
  return (
    <Layout title={url.query.title}>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut necessitatibus hic iure adipisci delectus totam ex numquam commodi officia autem.</p>
    </Layout>
  );
};

export default Post;