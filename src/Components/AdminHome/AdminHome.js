import * as React from "react";
import { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate, } from "react-router-dom";
import UserTable from './UserTable'


const AdminHomePage = () => {
    const navigate = useNavigate();
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
    return (
        <>
            <Box sx={{ flexGrow: 1 }} style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
                <AppBar position="static">
                    <Toolbar style={{ background: 'black' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Admin Panel - {user?.userName}
                        </Typography>
                        <Button color="inherit" onClick={() => {
                            navigate('/signin')
                        }}>LogOut</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="pa-5">
                <div className="mx-5 mt-2">
                    <UserTable />
                </div>

            </div>
        </>
    );
};

export default AdminHomePage;
