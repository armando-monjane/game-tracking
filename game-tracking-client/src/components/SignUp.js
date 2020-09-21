import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "./common/Copyright";
import { Link } from "react-router-dom";
import { authenticationService } from '../services'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';



const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
  

  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      firstName: '',
      lastName: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      openSnackBar: false,
      snackBarMessage: ''
    }
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
        return;
    };
}


  handleChange = key => event => {
    this.setState({
      [key]: event.target.value,
    });
  };


  handleRegister = async event => {
    event.preventDefault();


    const {email, password, firstName, lastName} = this.state;

    //TODO: validate the form
    authenticationService.register(email, password, firstName, lastName).then((response) => {
      if (response !== undefined && response?.status === 200) {
        //TODO: show success notifications
        //this.setState({openSnackBar: true, snackBarMessage: "Conta criada com sucesso"});

        authenticationService.login(email, password).then((response) => {
          if (response !== undefined && response?.status === 200) {
            this.props.history.push("/games");
          }
        });
      }
    });

  }

  handleCloseSnackBar = () => {
    this.setState({openSnackBar: false});
  }

  render() {

    const { classes } = this.props;
    const {firstName, lastName, email, password, confirmPassword, openSnackBar, snackBarMessage} = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Criar Conta
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName}
                  onChange={this.handleChange("firstName")}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  onChange={this.handleChange("lastName")}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={this.handleChange("email")}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={this.handleChange("password")}
                  variant="outlined"
                  required
                  fullWidth
                  label="Senha"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={confirmPassword}
                  onChange={this.handleChange("confirmPassword")}
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirmar Senha"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Quero receber sugestões e updates via email."
                />
              </Grid>
            </Grid>
            <Button
              onClick={this.handleRegister}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Criar
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Possui conta? Iniciar Sessão
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>

        
        <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={openSnackBar}
                autoHideDuration={6000}
                onClose={this.handleCloseSnackBar}
                message={snackBarMessage}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleCloseSnackBar}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />
      </Container>
    );
  }
}

export default (withStyles(styles)(SignUp))