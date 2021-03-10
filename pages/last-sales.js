import { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSales = ({ salesData }) => {
  const [sales, setSales] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    'https://next-backend-default-rtdb.firebaseio.com/sales.json'
  );

  useEffect(() => {
    const transformedData = [];

    for (const key in data) {
      transformedData.push({ id: key, data: data[key] });
    }

    setSales(transformedData);
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch('https://next-backend-default-rtdb.firebaseio.com/sales.json')
  //     .then(res => res.json())
  //     .then(data => {
  //       const transformedData = [];

  //       for (const key in data) {
  //         transformedData.push({ id: key, data: data[key] });
  //       }

  //       setSales(transformedData);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {sales.map(({ id, data }) => (
        <li key={id}>
          {data.username} ${data.volume}
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async () => {
  return fetch('https://next-backend-default-rtdb.firebaseio.com/sales.json')
    .then(res => res.json())
    .then(data => {
      const transformedData = [];

      for (const key in data) {
        transformedData.push({ id: key, data: data[key] });
      }

      return {
        props: {
          salesData: transformedData
        },
        revalidate: 10
      };
    });
};

export default LastSales;
