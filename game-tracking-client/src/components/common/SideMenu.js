import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SportsEsports from '@material-ui/icons/SportsEsports';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

  
const styles = theme => ({
  navLink: {
    textDecoration: 'none',
    color: '#707070'
  }
});

class SideMenu extends Component {


  render() {

    const {classes} = this.props;

    return (
      <div>
        <NavLink to="/games" className={classes.navLink} activeClassName="selected-link">
          <ListItem button>
            <ListItemIcon>
              <SportsEsports />
            </ListItemIcon>
            <ListItemText primary="Jogos" />
          </ListItem>
        </NavLink>

        <NavLink to="/friends" className={classes.navLink} activeClassName="selected-link">
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Amigos" />
          </ListItem>
        </NavLink>

        <NavLink to="/reports" className={classes.navLink} activeClassName="selected-link">
          <ListItem button>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Relatórios" />
          </ListItem>
        </NavLink>
      </div>
    );
  }
}

export default (withStyles(styles)(SideMenu));
