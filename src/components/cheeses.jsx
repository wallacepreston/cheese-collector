import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const CHEESES = gql`
  query{
    cheeses {
      cheeses {
        id
        title
        description
      }
      total
    }
  }
`;

const Cheeses = () => {
  const { loading, error, data } = useQuery(CHEESES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.cheeses.cheeses.map(({ id, title, description }) => (
    <div key={id}>
      <p>
        {title}: {description}
      </p>
    </div>
  ));
}

export default Cheeses;
