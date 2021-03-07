import path from 'path';
import fs from 'fs/promises';

function HomePage({ products }) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}

export default HomePage;

export const getStaticProps = async () => {
  // executed on server

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json'); // cwd current working directory
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (data.products.length === 0) {
    return {
      notFound: true // if true show 404 page
    };
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10, // regenerate page in seconds
    notFound: true, // if true show 404 page
    // redirect: {
    //   destination: '/no-data'
    // }
  };
};
