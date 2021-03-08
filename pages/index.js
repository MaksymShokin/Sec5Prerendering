import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage({ products }) {
  return (
    <ul>
      {products.map(({ id, title }) => (
        <Link key={id} href={`/${id}`}>
          <li>{title}</li>
        </Link>
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
    revalidate: 10 // regenerate page in seconds
    // notFound: true, // if true show 404 page
    // redirect: {
    //   destination: '/no-data'
    // }
  };
};
