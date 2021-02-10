import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ToggleTabs from '../Components/ToggleTabs';
import CampaignResults from './CampaignResults';
import AssignmentResults from './AssignmentResults';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paddedItem: {
    paddingTop: theme.spacing(5),
  },
}));

const navItems = [
  {
    text: 'CAMPAIGN',
    route: 'campaignresults',
  },
  {
    text: 'ASSIGNMENT',
    route: 'assignmentresults',
  },
];

function GetResultsTab(resultsTab) {
  console.log(resultsTab);
  switch (resultsTab) {
    case 'campaignresults':
      return <CampaignResults />;
    case 'assignmentresults':
      return <AssignmentResults />;
    default:
    // code block
  }
}

function Results(props) {
  const classes = useStyles();
  console.log('Load contests');
  return (
    <Grid className={classes.paddedItem} container>
      <Grid item xs={12}>
        <Typography align="center" variant="h2">
          Results
        </Typography>
      </Grid>

      <Grid align="center" item xs={12}>
        <ToggleTabs navItems={navItems} tab={props.match.params.resultsTab} />
      </Grid>
      <Grid item xs={12}>
        {GetResultsTab(props.match.params.resultsTab)}
      </Grid>
    </Grid>
  );
}

export default Results;