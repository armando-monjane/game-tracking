import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import SignUp from "./SignUp";
import SignInSide from "./SignInSide";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoute from "../routers/PublicRoute";
import PrivateRoute from "../routers/PrivateRoute";
import Dashboard from "./common/Dashboard";
import { authenticationService } from "../services/authenticationService";


const styles = theme => ({
    root: {
      width: '100%',
      overflowX: 'auto',
    }
  });

class Main extends Component {

    constructor(props) {
        super();

        this.state = {
            loading: false,
            dialogOpen: false,
            currentUser: null
        };
        
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }


    render() {

        const { classes } = this.props;
        const { currentUser, loading } = this.state;
    
        if (loading) {
            return (
                    <Grid container className={classes.root} alignItems='center' justify='center'>
                        <Grid item xs={1}>
                            <CircularProgress size={100} thickness={1} />
                        </Grid>
                    </Grid>);
        }

        return (

            <div className={classes.root}>
                <Router>
                    <div>
                        <PrivateRoute path="/" authenticated={currentUser !== null} component={Dashboard} />
                        <PublicRoute path="/signup" component={SignUp} />
                        <PublicRoute path="/login" component={SignInSide} />
                    </div>
                </Router>
            </div>
        );


    }

}

export default (withStyles(styles)(Main));