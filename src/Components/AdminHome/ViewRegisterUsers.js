import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserService from '../../Service/UserService'
import { useEffect, useState } from 'react'
import { Button, CircularProgress } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";


const RegisterdUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    const [loading, setLaoding] = useState(false)
    useEffect(() => {
        const loggedInUser = localStorage.getItem('user')
        if (!loggedInUser) {
            navigate('/signin')
        }
        else {
            setUser(JSON.parse(loggedInUser))
        }
    }, [navigate])

    useEffect(() => {
        setLaoding(true)
        UserService.getUsers().then(data => {
            setLaoding(false)
            setUsers(data.data);
        }).catch(e => {
            setLaoding(false)
        });
        return (() => {
            localStorage.removeItem('user')
        })
    }, []);

    const approveUser = async (user) => {
        try {
            const { data } = await UserService.approveUser({ id: user._id })
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === data.user._id ? data.user : user
                )
            );
            console.log(data)
        }
        catch (e) {
            console.log(e)
        }
    }

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
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="d-flex justify-content-between">
                                    <span>Registerd Users</span>
                                    <Button variant="outlined" onClick={() => {
                                        navigate('/admin')
                                    }}>Dashboard </Button>
                                </div>
                                {loading ? <div style={{ textAlign: 'center' }}><CircularProgress size={24} sx={{
                                    color: 'black',
                                }} /> </div> : <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="user table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>User</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((row) => (
                                                <TableRow key={row._id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                                    <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                                                        {row.userName}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>{row.email}</TableCell>
                                                    <TableCell sx={{ textAlign: 'center', color: row.isApproved ? 'green' : 'red' }}>
                                                        {row.isApproved ? 'Approved' : 'Pending'}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                            sx={{ backgroundColor: row.isApproved ? 'grey' : 'blue' }}
                                                            disabled={row.isApproved}
                                                            onClick={() => {
                                                                approveUser(row)
                                                            }}
                                                        >
                                                            {row.isApproved ? 'Approved' : 'Approve'}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterdUsers;