import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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

  if (loading) return <Typography variant="body2" component="p">Loading...</Typography>;
  if (error) return <Typography variant="body2" component="p">Error :(</Typography>;

  return <Box display="flex" flexWrap="wrap">
    {  
      data.cheeses.cheeses.map(({ id, title, description }) => (
        <div key={id} style={{ width: '30%', height: '20%', margin: '1%' }}>
          <Card variant="outlined" >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body2" component="p">
                {description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      ))
    }
  </Box>
}

export default Cheeses;
