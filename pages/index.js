function HomePage({ products }) {
  return (
    <ul>
      {products.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}

export default HomePage;

export const getStaticProps = async () => {
  // executed on server
  return {
    props: {
      products: [
        {
          id: 1,
          name: 'Product 1'
        }
      ]
    }
  };
};
