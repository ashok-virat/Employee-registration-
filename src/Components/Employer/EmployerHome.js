import * as React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {
    Button,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import EmployeeTable from './EmployeeTable'
import CreateArtPopup from './createArtWork'



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
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser))
        }
    }, [])

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

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/signin')
    }

    return (<>
        <Box sx={{ flexGrow: 1 }} style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
            <AppBar position="static">
                <Toolbar style={{ background: 'black' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Employee - {user?.userName}
                    </Typography>
                    <Button color="inherit" onClick={() => {
                        logout()
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
