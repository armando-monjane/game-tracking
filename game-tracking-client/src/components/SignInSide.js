import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Copyright from "./common/Copyright";
import { Link } from "react-router-dom";
import { authenticationService } from '../services/authenticationService';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(https://source.unsplash.com/collection/878073)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    marginTop: 100
  }
});

class SignInSide extends Component {

  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) { 
      this.props.history.push('/games');
  }

    this.state = {
      email: '',
      password: '',
      showPassword: false,
      loading: false
    };
  }

  handleChange = key => event => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleKeyPress = async event => {

      if (event.key === "Enter") {
          this.handleLogin(event);
      }
  };

  handleLogin = async event => {
      event.preventDefault();
      this.setState({loading: true});

      const { email, password } = this.state;

      authenticationService.login(email, password).then((response) => {
        this.props.history.push("/games");
      }).catch((err) => {
        console.error(err);
        this.setState({loading: false})
      });
  }

  render() {

    const { classes } = this.props;
    const {loading } = this.state;

    if (loading) {
        return (
            <Grid container className={classes.root} alignItems='center' justify='center'>
                <Grid className={classes.card} item xs={1}>
                <CircularProgress className={classes.progress} size={100} thickness={1} />
            </Grid>
            </Grid>
        
        );
    }

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sessão
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange('email')}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={this.state.showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange('password')}

              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleLogin}
              >
                Iniciar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" >
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup">
                    {"Não possui conta? Criar"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}


export default (withStyles(styles)(SignInSide))