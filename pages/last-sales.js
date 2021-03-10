import { useEffect, useState } from 'react';

const LastSales = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://next-backend-default-rtdb.firebaseio.com/sales.json')
      .then(res => res.json())
      .then(data => {
        const transformedData = [];

        for (const key in data) {
          transformedData.push({ id: key, data: data[key] });
        }

        setSales(transformedData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !sales.length) {
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

export default LastSales;
