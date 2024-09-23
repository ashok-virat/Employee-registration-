import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserService from './../../Service/UserService'
import { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate, } from "react-router-dom";


const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService.getUsers().then(data => {
            setUsers(data.data);
        }).catch(e => {
            console.log(e);
        });
        return (() => {
            // localStorage.removeItem('user')
        })
    }, []);

    const approveUser = async (user) => {
        console.log(user)
        try {
            const data = await UserService.approveUser({ id: user._id })
            console.log(data)
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'left' }}>User</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'left' }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <TableRow key={row._id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                                {row.userName}
                            </TableCell>
                            <TableCell sx={{ textAlign: 'left' }}>{row.email}</TableCell>
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
        </TableContainer>
    );
};

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
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Admin Panel
                        </Typography>
                        <Button color="inherit" onClick={() => {
                            navigate('/signin')
                        }}>LogOut</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="pa-5">
                <div className="mx-5 mt-2">
                    <p style={{
                        fontSize: "larger",
                        fontWeight: 700
                    }}>{user?.userName}</p>
                    <UserTable />
                </div>

            </div>
        </>
    );
};

export default AdminHomePage;
