import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_DATA = gql`
  query GetData {
    data {
      id
      name
    }
  }
`;

const DataComponent = () => {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;  

  return (
    <ul>
      {data.data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default DataComponent;
