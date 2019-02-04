import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Graph from './Graph'

const styles = {
  card: {
    minWidth: 275,
    margin: '2em'
  },
  title: {
    fontSize: 18,
    paddingBottom: '1em'
  },
  pos: {
    marginBottom: 12,
  },
};

function CardDashboard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} >
          Analytics
        </Typography>
        <Graph></Graph>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

CardDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardDashboard);
