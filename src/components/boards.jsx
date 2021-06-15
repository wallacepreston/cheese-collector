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

const BOARDS = gql`
  query{
    boards {
      id
      type
      description
      cheeses {
        id
        title
        description
      }
    }
  }
`;

const Boards = () => {
  const { loading, error, data } = useQuery(BOARDS);

  if (loading) return <Typography variant="body2" component="p">Loading...</Typography>;
  if (error || !data.boards) return <Typography variant="body2" component="p">Error :(</Typography>;

  return <Box display="flex" flexWrap="wrap">
    {  
      data.boards.map(({ id, type, description }) => (
        <div key={id} style={{ width: '30%', height: '20%', margin: '1%' }}>
          <Card variant="outlined" >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {type}
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

export default Boards;
