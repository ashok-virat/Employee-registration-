import * as React from "react";
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Chip
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import moment from 'moment-timezone';


const BasicTable = ({ user }) => {
    const [arts, setArts] = useState([])
    useEffect(() => {
        UserService.getArts(user._id).then(data => {
            console.log(data)
            setArts(data.data)
        }).catch(e => {
            console.log(e)
        })
    }, [user])

    const completeArt = async (art) => {
        try {
            const data = await UserService.completeArt(art._id)
            console.log(data)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <Grid container spacing={3} className="mt-3">
            {arts.map((art) => (
                <Grid item xs={12} sm={6} md={4} key={art._id}>
                    <Card sx={{ minHeight: 220 }}>
                        <CardHeader title={art.artName} className="pb-0" />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                <span>Description:</span> {art.description}
                            </Typography>
                            <Typography variant="body2" color="text.primary" style={{ marginTop: '8px' }}>
                                <span>Status:</span> <span className="pl-2" style={{ color: art.status === 'inProgress' ? 'blue' : 'green' }}>{art.status} </span>
                                <p className="pt-2">
                                    Time Taken:
                                    {art?.timeTaken?.days > 0 && ` ${art.timeTaken.days} day(s),`}
                                    {art?.timeTaken?.hours > 0 && ` ${art.timeTaken.hours} hour(s),`}
                                    {art?.timeTaken?.minutes > 0 && ` ${art.timeTaken.minutes} minute(s),`}
                                    {art?.timeTaken?.seconds > 0 && ` ${art.timeTaken.seconds} second(s)`}
                                </p>
                            </Typography>
                            <hr></hr>
                            <Typography variant="body2" color="text.primary" style={{ marginTop: '8px' }} className="d-flex justify-content-between">
                                <div>Created date: <p className="mb-0"> {moment(art.createdOn).tz('Asia/Kolkata').format('MMMM Do YYYY, h:mm:ss A')}</p></div>
                                <div>Comepleted date <p className="mb-0">{art?.completedOn ? moment(art.completedOn).tz('Asia/Kolkata').format('MMMM Do YYYY, h:mm:ss A') : "-"}</p></div>
                            </Typography>
                            <hr></hr>
                            <div className="mt-3">
                                {art.status === 'inProgress' ? <Chip color="primary" label="Complete the Art work" onClick={() => {
                                    completeArt(art)
                                }} /> : <Chip color="success" label="Art work Completed" />}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            ))
            }
        </Grid >
    );
};

const CreateArtPopup = ({ open, handleClose, user }) => {
    const [art, setArt] = useState({
        artName: '',
        artDescription: ''
    })

    const handleArt = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setArt(prevState => { return { ...prevState, [name]: value } })
    }

    const createArt = async (event) => {
        event.preventDefault();
        try {
            await UserService.createArt(
                { artName: art.artName, description: art.artDescription, status: 'inProgress', createdBy: user?._id, ownerName: user.userName })
            handleClose();
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <Dialog
            open={open}
            onClose={() => handleClose()}
            PaperProps={{
                component: "form",
                onSubmit: (e) => {
                    createArt(e)
                },
            }}
            className="pa-3"
        >
            <DialogTitle>Create an Art</DialogTitle>
            <DialogContent sx={{ width: "500px" }}>
                <Typography>Name *</Typography>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="artName"
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Please type your art name"
                    value={art.artName}
                    onChange={(e) => {
                        handleArt(e)
                    }}
                />
                <Typography className="mt-2">Description</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="artDescription"
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="Specify description for the art"
                    value={art.artDescription}
                    onChange={(e) => {
                        handleArt(e)
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()}>Cancel</Button>
                <Button type="submit" variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const HomePage = () => {
    const [isPopUpOpen, setIsPoUpOpen] = useState(false);
    const handlePopUpOpen = () => {
        setIsPoUpOpen((prev) => !prev);
    };
    const navigate = useNavigate()
    const handleClose = () => {
        setIsPoUpOpen(false);
    };
    const [user, setUser] = useState({})
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user')
        if (!loggedInUser) {
            navigate('/signin')
        }
        else {
            setUser(JSON.parse(loggedInUser))
        }
    }, [navigate])
    return (<>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Employee - {user?.userName}
                    </Typography>
                    <Button color="inherit" onClick={() => {
                        navigate('/signin')
                    }}>LogOut</Button>
                </Toolbar>
            </AppBar>
        </Box>
        <div className="pa-5">
            <div className="mt-5 mx-5">
                <div>
                    <div className="align-content-center d-flex justify-content-between">
                        <p style={{
                            fontSize: "larger",
                            fontWeight: 700
                        }}>Arts</p>
                        <Button variant="outlined" color="success" onClick={handlePopUpOpen}>
                            Create Art
                        </Button>
                    </div>
                </div>
                <BasicTable user={user} />
            </div>
            <CreateArtPopup open={isPopUpOpen} handleClose={handleClose} user={user} />
        </div>
    </>

    );
};

export default HomePage;
