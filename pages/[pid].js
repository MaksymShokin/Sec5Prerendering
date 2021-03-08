import path from 'path';
import fs from 'fs/promises';

const ProductDetail = ({ product }) => {
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // cwd current working directory
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find(elem => elem.id === params.pid);

  return {
    props: {
      product: product
    },
    revalidate: 10
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { pid: 'p1' }
      },
      {
        params: { pid: 'p2' }
      },
      {
        params: { pid: 'p3' }
      }
    ],
    fallback: false
  };
};

export default ProductDetail;
