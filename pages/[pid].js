import path from 'path';
import fs from 'fs/promises';

const ProductDetail = ({ product }) => {
  // when fallback set to true, data has to be fetched and it does not happens instantly
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // cwd current working directory
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
};

export const getStaticProps = async ({ params }) => {
  const data = await getData();
  const product = data.products.find(elem => elem.id === params.pid);

  if (!product) {
    return {
      notFound: true
    };
  }
  // use together with fallback: true / fallback: 'blocking' 
  // if no data found redirect to 404

  return {
    props: {
      product: product
    },
    revalidate: 10
  };
};

export const getStaticPaths = async () => {
  const data = await getData();

  const ids = data.products.map(({ id }) => id);

  const paths = ids.map(id => ({
    params: {
      pid: id
    }
  }));

  return {
    paths: paths,
    // {
    //   params: { pid: 'p2' }
    // },
    // {
    //   params: { pid: 'p3' }
    // }
    // ],
    // fallback: true, // allows visiting pages which are not pregenerated
    fallback: 'blocking'
  };

  // fallback: false --all paths has to be included
  // fallback: true --allows visiting pages which are not pregenerated, but props need to be checked (first time they are empty)
  // fallback: 'blocking' --allows visiting pages which are not pregenerated, but page is fully rendered on server, so no props check is needed
};

export default ProductDetail;
