import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DropdownDashBoard from './DropdownDashBoard'

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
    <Card className={classes.card} elevation={7}>
      <CardContent>
        <Typography className={classes.title}>
          Analytics
        </Typography>
        <DropdownDashBoard />
        {/* <Graph></Graph> */}
      </CardContent>
    </Card>
  );
}

CardDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardDashboard);
