import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';

import Home from '../Home/Home';
import Login from '../Authentication/Login';
import Results from '../Results/Results';
import Questions from '../Questions/Questions';
import Assignments from '../Assignments/Assignments';
import Students from '../Students/Students';
import Resources from '../Resources/Resources';

import ConfirmationDialog from './ConfirmationDialog';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  logo: {
    maxHeight: '64px',
  },
  appBarHeader:{
      display:'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
  },
  tabs: {
      color: '#FFFFFF',
  }
}));



export default function PersistentDrawerRight() {
    const navItems = [
        {
            text:"Home",
            route:"/home"
        },
        {
            text:"Results",
            route:"/studentresults/campaignresults"
        },
        {
            text:"Questions",
            route:"/questionbank"
        },
        {
            text:"Assignments",
            route:"/assignments"
        },
        {
            text:"Students",
            route:"/studentdata"
        },
        {
          text:"Resources",
          route:"/teachingmaterials"
      },

    ];
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // logout actions
  const [openLogout, setOpenLogout] = useState(false);

  const handleLogout = () => {
    setOpenLogout(true);
  };

  const handleLogoutConfirmation = () => {
    setOpenLogout(false);
  };

  return (
    <BrowserRouter>
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
                Studify
            </Typography>

            <Hidden smDown>
                <div className={classes.appBarHeader}>
                {navItems.map((item, index) => (
                    <Button className={classes.tabs} component={Link} to={item.route}>
                    {item.text}
                    </Button>
                    ))}
                </div>
            </Hidden>
            <IconButton onClick={handleLogout}>
              <PowerSettingsNewIcon style={{ color: '#FFFFFF' }}/>
            </IconButton>
            
            <Hidden mdUp>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                    className={clsx(open && classes.hide)}
                >
                <MenuIcon />
                </IconButton>
            </Hidden>
         </Toolbar>
      </AppBar>

      {openLogout && <ConfirmationDialog  
        title={"Log out"}
        content={"Confirm log out? You will be returned to the login screen."}
        parentCallback={handleLogoutConfirmation} 
        type='logout'/>}
      
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route path="/studentresults/:resultsTab" component={Results}/>
            <Route path="/questionbank" component={Questions}/>
            <Route path="/assignments" component={Assignments}/>
            <Route path="/studentdata" component={Students}/>
            <Route path="/teachingmaterials" component={Resources}/>
        </Switch>
    
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        {/* <Divider /> */}
        <List>
            {navItems.map((item, index) => (
                <ListItem button key={item.text} component={Link} to={item.route}>
                <ListItemText primary={item.text} />
                </ListItem>
            ))}

        </List>
      </Drawer>
    </div>
    </BrowserRouter>
  );
}