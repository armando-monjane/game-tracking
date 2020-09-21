import { withStyles } from "@material-ui/core";
import React, { Component } from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from '@material-ui/core/Snackbar';

import { friendsService } from '../services/friendsService'
import Title from "./common/Title";

const styles = theme => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
    margin: {
        margin: theme.spacing(1),
      },
});

class FriendsPage extends Component {

    constructor(props) {
        super();

        this.state = {
            data: [],
            openAddDialog: false,
            saving: false,
            updating: false,
            creating: false,
            friendId: 0,
            openSnackBar: false,
            snackBarMessage: '',
            openDeleteDialog: false,
            deleting: false,
            name: ''
         }
    }

    componentDidMount() {
       this.fetchFriends();
    }

    fetchFriends = () => {
        friendsService.getFriends().then((result) => {
            if (result) {
                this.setState({data: result});
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    handleChange = key => event => {
        this.setState({
          [key]: event.target.value,
        });
      };

    handleClose = () => {
        this.setState({openAddDialog: false});
    }

    handleCloseSnackBar = () => {
        this.setState({openSnackBar: false});
    }

    handleOpenDialog = () => {
        this.setState({
            openAddDialog: true,
            updating: false,
            creating: true,
            saving: false});
    }

    handleSubmit = () => {

        const { name }  = this.state;

        this.setState({saving: true});

        friendsService.saveFriend(name)
                    .then(() => {
                        this.setState({
                            saving: false,
                            name: '',
                            creating: false,
                            snackBarMessage: 'Amigo Gravado com sucesso!',
                            openSnackBar: true
                        });

                        this.fetchFriends();
                        this.handleClose(); 
                    }).catch((err) => console.error(err));
    }

    editFriend = (friend) => {
        this.setState({
            name: friend.name,
            openAddDialog: true,
            updating: true,
            creating: false,
            friendId: friend.id,
        });
    }

    
    handleUpdate = () => {

        this.setState({saving: true});
        const { name, friendId }  = this.state;

        friendsService.updateFriend(friendId, name)
                    .then(() => {
                        this.setState({saving: false,
                            name: '',
                            updating: false,
                            snackBarMessage: 'Amigo Actualizado com sucesso!',
                            openSnackBar: true
                        });
                        
                        this.fetchFriends();
                        this.handleClose();
                    });
    }


    deleteFriend = (friend) => {
        this.setState({openDeleteDialog: true, friendId: friend.id});
    }

    handleCancelDelete = () => {
        this.setState({openDeleteDialog: false});
    }

    handleDelete = () => {
        this.setState({deleting: true})
        const { friendId } = this.state;
        friendsService.deleteFriend(friendId)
                    .then(() => {
                        
                        this.setState({ deleting: false, openSnackBar: true, snackBarMessage: 'Amigo removido com sucesso'});
                        this.setState({openDeleteDialog: false});
                        this.fetchFriends()

                    })
    }

    render() {

    const {
        data,
        openAddDialog,
        name,
        saving,
        updating, 
        creating,
        openSnackBar,
        snackBarMessage,
        openDeleteDialog,
        deleting
    }  = this.state;

    const {classes} = this.props;

        return(
            <React.Fragment>
            <Title>Amigos</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Acções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((friend) => (
                  <TableRow key={friend.id}>
                    <TableCell>{friend.name}</TableCell>
                    <TableCell>

                        <IconButton aria-label="delete" className={classes.margin} onClick={() => this.editFriend(friend)}>
                            <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton aria-label="delete" className={classes.margin} onClick={() => this.deleteFriend(friend)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            
            <Fab color="primary" aria-label="add">
                <AddIcon onClick={this.handleOpenDialog} />
            </Fab>

            <Dialog open={openAddDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adicionar Amigo</DialogTitle>
                <DialogContent>
                    <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Título"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={this.handleChange('name')}                            
                        />

                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancelar
                </Button>

                {
                    creating ? <Button onClick={this.handleSubmit} color="primary">Gravar</Button> : null
                }

                {
                    updating ? <Button onClick={this.handleUpdate} color="primary">
                                    Actualzar
                                </Button> : null
                }
                </DialogActions>
                <LinearProgress hidden={!saving} />
            </Dialog>


            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={openDeleteDialog}
                >
                    <DialogTitle id="confirmation-dialog-title">Remover Amigo?</DialogTitle>
                    <DialogContent dividers>
                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus onClick={this.handleCancelDelete} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                            Remover
                        </Button>
                    </DialogActions>
                    <LinearProgress hidden={!deleting} />
            </Dialog>

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
          </React.Fragment>
        );
    }

}

export default (withStyles(styles)(FriendsPage))