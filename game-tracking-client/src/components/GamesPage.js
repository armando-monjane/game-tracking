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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from '@material-ui/core/Snackbar';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core";
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { gamesService, friendsService } from '../services/'
import Title from "./common/Title";


const styles = theme => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
    margin: {
        margin: theme.spacing(1),
      },
});


class GamesPage extends Component {

    constructor(props) {
        super();

        this.state = {
            data: [],
            openAddDialog: false,
            title: '',
            description: '',
            platform: '',
            launchDate: '2020-09-18',
            saving: false,
            creating: false,
            gameId: 0,
            openSnackBar: false,
            snackBarMessage: '',
            openDeleteDialog: false,
            deleting: false,
            friends: [],
            gameToBorrow: null,
            borrowing: false,
            friendToBorrowId: 0,
            openBorrowDialog: false,
            openWithdrawDialog: false,
            withdrawing: false
         }
    }

    componentDidMount() {
       this.fetchGames();
       this.fetchFriends();
    }

    fetchGames = () => {
        gamesService.getGames().then((result) => {
            this.setState({data: result});
        }).catch((err) => console.error(err));
    }

    fetchFriends = () => {
        friendsService.getFriends().then((result => {
            this.setState({friends: result});
        })).catch((err) => console.error(err));
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
            creating: true,
            saving: false,
            platform: '',
            title: '',
            description: '',
            launchDate: ''});
    }

    handleSubmit = () => {

        const { platform, title, description, launchDate }  = this.state;

        this.setState({saving: true});

        gamesService.saveGame(title, description, platform, launchDate)
                    .then(() => {


                        this.setState({
                            saving: false,
                            platform: '',
                            title: '',
                            description: '',
                            launchDate: '',
                            creating: false,
                            snackBarMessage: 'Jogo Gravado com sucesso!',
                            openSnackBar: true,
                            gameToRemove: null
                        });

                        this.fetchGames();
                        this.handleClose(); 
                    }).catch((err) => console.error(err));
    }

    editGame = (game) => {
        this.setState({
            title: game.title,
            description: game.description,
            platform: game.platform,
            launchDate: game.launchDate,
            openAddDialog: true,
            creating: false,
            gameId: game.gameId,
        });
    }

    
    handleUpdate = () => {

        this.setState({saving: true});
        const { platform, title, description, launchDate, gameId }  = this.state;

        gamesService.updateGame(gameId, title, description, platform, launchDate)
                    .then(() => {
                        this.setState({saving: false,
                            platform: '',
                            title: '',
                            description: '',
                            launchDate: '',
                            snackBarMessage: 'Jogo Actualizado com sucesso!',
                            openSnackBar: true
                        });
                        
                        this.fetchGames();
                        this.handleClose();
                    });
    }


    deleteGame = (game) => {
        this.setState({openDeleteDialog: true, gameId: game.gameId, gameToRemove: game});
    }

    handleCancelDelete = () => {
        this.setState({openDeleteDialog: false});
    }

    handleDelete = () => {
        this.setState({deleting: true})
        const { gameId } = this.state;
        gamesService.deleteGame(gameId).then(() => {
            this.setState({ deleting: false, openSnackBar: true, snackBarMessage: 'Jogo removido com sucesso'});
            this.setState({openDeleteDialog: false});
            this.fetchGames()
        });

    }

    borrowGame = (game) => {
        this.setState({openBorrowDialog: true, gameToBorrow: game, friendToBorrowId: 0});
    }

    handleCancelBorrow = () => {
        this.setState({openBorrowDialog: false});
    }

    handleBorrow = () => {

        const {gameToBorrow, friendToBorrowId } = this.state;

        if (friendToBorrowId <= 0) {
            //TODO: validadte
            return;
        }

        this.setState({borrowing: true});

        gamesService.borrowGame(gameToBorrow.gameId, friendToBorrowId)
        .then((response) => {
            if (response?.status === 201) {
                this.setState({
                    openBorrowDialog: false,
                    openSnackBar: true,
                    snackBarMessage: 'Jogo emprestado com sucesso'
                });

                this.fetchGames();
            }
        }).catch((err) => console.error(err));
    }

    openWithdrawDialog = (game) => {
        this.setState({openWithdrawDialog: true, gameToBorrow: game});
    }

    handleCancelWithdraw = () => {
        this.setState({openWithdrawDialog: false})
    }

    handleWithdraw = () => {

        const { gameToBorrow } = this.state;

        if (gameToBorrow == null) {
            //TODO: validadte
            return;
        }

        this.setState({borrowing: true});

        gamesService.withdrawGame(gameToBorrow.loans[0].id, gameToBorrow.gameId, gameToBorrow.loans[0].friend?.id)
        .then((response) => {
            if (response?.status === 204) {
                this.setState({
                    openWithdrawDialog: false,
                    openSnackBar: true,
                    snackBarMessage: 'Jogo gravado com sucesso'
                });

                this.fetchGames();
            }
        }).catch((err) => console.error(err));
    }


    render() {

    const {
        data,
        openAddDialog,
        platform,
        title,
        description,
        launchDate,
        saving,
        creating,
        openSnackBar,
        snackBarMessage,
        openDeleteDialog,
        deleting,
        friends,
        gameToBorrow,
        borrowing,
        withdrawing,
        friendToBorrowId,
        openBorrowDialog,
        openWithdrawDialog,
        gameToRemove
    }  = this.state;

    const {classes} = this.props;

        return(
            <React.Fragment>
            <Title>Jogos</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Titulo</TableCell>
                  <TableCell>Plataforma</TableCell>
                  <TableCell>Data de Lançamento</TableCell>
                  <TableCell>Emprestado a</TableCell>
                  <TableCell>Acções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((game) => (
                  <TableRow key={game.gameId}>
                    <TableCell>{game.title}</TableCell>
                    <TableCell>{game.platform}</TableCell>
                    <TableCell>{game.launchDate}</TableCell>
                    <TableCell>{(game.loans?.length > 0) ? game.loans[0].friend?.name : "-"}</TableCell>
                    <TableCell>

                        <Tooltip title="Editar">
                            <IconButton aria-label="delete" className={classes.margin} onClick={() => this.editGame(game)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Remover">
                            <IconButton aria-label="delete" className={classes.margin} onClick={() => this.deleteGame(game)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        {}
                        {game.loans?.length > 0 ?
                            <Tooltip title="Marcar como devolvido">
                                <IconButton aria-label="edit" className={classes.margin} onClick={() => this.openWithdrawDialog(game)}>
                                    <CheckBoxIcon />
                                </IconButton>
                            </Tooltip> :
                            <Tooltip title="Emprestar">
                                <IconButton aria-label="edit" className={classes.margin} onClick={() => this.borrowGame(game)}>
                                    <ScreenShareIcon />
                                </IconButton>
                            </Tooltip>   
                        }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <Fab color="primary" aria-label="add">
                <AddIcon onClick={this.handleOpenDialog} />
            </Fab>

            <Dialog open={openAddDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{creating ? "Adicionar Jogo" : "Editar dados do Jogo"}</DialogTitle>
                <DialogContent>
                    <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Título"
                            type="text"
                            fullWidth
                            value={title}
                            onChange={this.handleChange('title')}                            
                        />
                        
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Descrição"
                            type="text"
                            fullWidth
                            value={description}
                            onChange={this.handleChange('description')}
                        />

                        <Select
                            value={platform}
                            onChange={this.handleChange('platform')}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                                <em>Selecione</em>
                            </MenuItem>
                            <MenuItem value="PS5">PS5</MenuItem>
                            <MenuItem value="PS4">PS4</MenuItem>
                            <MenuItem value="XBOX ONE">XBOX ONE</MenuItem>
                            <MenuItem value="PC">PC</MenuItem>
                            <MenuItem value="PS3">PS3</MenuItem>
                            <MenuItem value="XBOX 360">XBOX 360</MenuItem>
                        </Select>

                        <br/>
                        <br/>
                        <br/>

                        <TextField
                            id="date"
                            label="Data de Lançamento"
                            type="date"
                            value={launchDate}
                            onChange={this.handleChange('launchDate')}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />

                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancelar
                </Button>
                {creating ? <Button onClick={this.handleSubmit} color="primary">Gravar</Button> : <Button onClick={this.handleUpdate} color="primary">Actualizar</Button>}
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
                    <DialogTitle id="confirmation-dialog-title">Remover o Jogo <b>{gameToRemove?.title}</b>?</DialogTitle>
                    <DialogContent dividers>
                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus onClick={this.handleCancelDelete} color="default">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleDelete} color="primary">
                            Sim
                        </Button>
                    </DialogActions>
                    <LinearProgress hidden={!deleting} />
            </Dialog>

            
            <Dialog
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={openBorrowDialog}
                >
                    <DialogTitle id="confirmation-dialog-title">Emprestar o jogo <b>{gameToBorrow?.title}</b></DialogTitle>
                    <DialogContent>

                        <Select
                            value={friendToBorrowId}
                            onChange={this.handleChange('friendToBorrowId')}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value={0}>
                                <em>Selecione</em>
                            </MenuItem>
                            {friends.map((friend) => (
                                <MenuItem key={friend.id} value={friend.id}>{friend.name}</MenuItem>
                            ))}
                        </Select>

                </DialogContent>

                    <DialogActions>
                        <Button onClick={this.handleCancelBorrow} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleBorrow} color="primary">
                            Sim
                        </Button>
                    </DialogActions>
                    <LinearProgress hidden={!borrowing} />
            </Dialog>


            <Dialog
                disableEscapeKeyDown
                maxWidth="xs"
                aria-labelledby="confirmation-dialog-title"
                open={openWithdrawDialog}
                >
                    <DialogTitle id="confirmation-dialog-title">Marcar o jogo <b>{gameToBorrow?.title}</b> como devolvido?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleCancelWithdraw} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleWithdraw} color="primary">
                            Sim
                        </Button>
                    </DialogActions>
                    <LinearProgress hidden={!withdrawing} />
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

export default (withStyles(styles)(GamesPage))