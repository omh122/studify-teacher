import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import SocialMedia from './SocialMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover(props) {
  const { assignment, parentCallback, anchorEl } = props;
  const classes = useStyles();

//   const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    parentCallback();
  };

  return (
    <div>
      <Popover
        id={assignment._id}
        open={true}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        
        <SocialMedia assignment={assignment}/>
      </Popover>
    </div>
  );
}
