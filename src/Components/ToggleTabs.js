import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  paddedItem: {
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(8),
      marginLeft: theme.spacing(8),
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(10),
      marginLeft: theme.spacing(10),
    },
  },
  selectedTabText: {
    color: '#b569a4 !important',
  },
}));

export default function ToggleTabs(props) {
  const classes = useStyles();
  return (
    <ToggleButtonGroup value={props.tab} exclusive className={classes.root}>
      {props.navItems.map((item, index) => (
        <ToggleButton
          component={Link}
          to={item.route}
          key={index}
          classes={{
            label: classes.paddedItem,
            selected: classes.selectedTabText,
          }}
          value={item.route}
        >
          {item.text}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}