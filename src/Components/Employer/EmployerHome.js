import * as React from "react";
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
    CircularProgress
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import EmployeeTable from './EmployeeTable'


const CreateArtPopup = ({ open, handleClose, user, updateArts }) => {
    const [art, setArt] = useState({
        artName: '',
        artDescription: ''
    })

    const [loading, setLoading] = useState(false)

    const handleArt = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setArt(prevState => { return { ...prevState, [name]: value } })
    }

    const createArt = async (event) => {
        event.preventDefault();
        try {
            setLoading(true)
            const { data } = await UserService.createArt(
                { artName: art.artName, description: art.artDescription, status: 'inProgress', createdBy: user?._id, ownerName: user.userName })
            setLoading(false)
            setArt({
                artName: '',
                artDescription: ''
            })
            handleClose();
            updateArts(data)
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
                <Button disabled={loading} type="submit" variant="contained">
                    {loading ? <CircularProgress size={24} sx={{
                        color: 'black',
                    }} /> : "Create"}
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

    const [arts, setArts] = useState([])

    const updateArts = ({ art }) => {
        setArts(prev => [art, ...prev])
    }

    const updateArt = ({ data }) => {
        data.updatedArt.timeTaken = data.timeTaken
        if (data?.updatedArt?._id) {
            setArts((prevArts) =>
                prevArts.map((art) =>
                    art._id === data.updatedArt._id ? data.updatedArt : art
                )
            );
        }
    }

    useEffect(() => {
        if (user?._id) {
            UserService.getArts(user._id).then(data => {
                setArts(data.data)
            }).catch(e => {
                console.log(e)
            })
        }
    }, [user])

    return (<>
        <Box sx={{ flexGrow: 1 }} style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
            <AppBar position="static">
                <Toolbar style={{ background: 'black' }}>
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
                <EmployeeTable user={user} arts={arts} updateArt={updateArt} />
            </div>
            <CreateArtPopup open={isPopUpOpen} handleClose={handleClose} user={user} updateArts={updateArts} />
        </div>
    </>

    );
};

export default HomePage;
