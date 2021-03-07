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

  return {
    props: {
      products: data.products
    }
  };
};
