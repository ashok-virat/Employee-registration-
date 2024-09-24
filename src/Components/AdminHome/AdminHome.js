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
import { Button } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate, } from "react-router-dom";
import { Grid } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import './admin.css'


const UserTable = () => {
    ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
    const navigate = useNavigate();
    const [arts, setArts] = useState([])

    const [chartData, setChartData] = useState({
        inProgressCount: 0,
        completedCount: 0,
    });

    const [userArts, setUserArts] = useState([])


    const getArts = async () => {
        try {
            const data = await UserService.getAllArts()
            setArts(data.data)
            const user = await UserService.getUserBasedArts()
            setUserArts(user.data)
            const inProgressCount = data.data.filter(art => art.status === 'inProgress').length;
            const completedCount = data.data.filter(art => art.status === 'completed').length;

            setChartData({
                inProgressCount,
                completedCount,
            });
        }
        catch (e) {
            console.log(e)
        }
    }

    const pieData = {
        labels: ['In Progress', 'Completed'],
        datasets: [
            {
                label: '# of Arts',
                data: [chartData.inProgressCount, chartData.completedCount],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const barData = {
        labels: ['In Progress', 'Completed'],
        datasets: [
            {
                label: '# of Arts',
                data: [chartData.inProgressCount, chartData.completedCount],
                backgroundColor: ['rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                borderColor: ['rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        getArts()
        return (() => {
            // localStorage.removeItem('user')
        })
    }, []);

    const [date, setDate] = useState(null)

    const getArtsByDate = React.useCallback(async () => {
        try {
            const data = await UserService.getAllArts(date[0], date[1])
            const user = await UserService.getUserBasedArts(date[0], date[1])
            if (data?.data && Array.isArray(data.data)) {
                setArts(data.data)
                setUserArts(user.data)
                const inProgressCount = data.data.filter(art => art.status === 'inProgress').length;
                const completedCount = data.data.filter(art => art.status === 'completed').length;

                setChartData({
                    inProgressCount,
                    completedCount,
                });
            }
            else {
                setArts([])
                setUserArts([])
                setChartData({
                    inProgressCount: 0,
                    completedCount: 0,
                })
            }
        }
        catch (e) {
            console.log(e)
        }
    }, [date])

    useEffect(() => {
        if (date) {
            getArtsByDate()
        }
    }, [date, getArtsByDate])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-between mt-2">    <span>
                        <Typography variant="h6" gutterBottom>
                            Dashboard - {arts.length}
                        </Typography></span>
                        <Button variant="outlined" onClick={() => {
                            navigate('/user')
                        }} >View Registered Users</Button></div>
                    <div className="justify-content-end d-flex pt-3">
                        <span>
                            <LocalizationProvider className="pt-0" dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateRangePicker']}>
                                    <DateRangePicker onChange={(e) => {
                                        if (e && e.length && e[1]) {
                                            setDate(e)
                                        }
                                    }} localeText={{ start: 'From', end: 'To' }} />
                                </DemoContainer>
                            </LocalizationProvider></span></div>
                    <Grid container spacing={3} className="mt-2">
                        {/* Pie Chart */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Art Work Progress
                                </Typography>
                                <div style={{ maxHeight: '250px', margin: '0 auto', }}>
                                    <Pie data={pieData} />
                                </div>
                            </Paper>
                        </Grid>

                        {/* Bar Chart */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Art Status Overview
                                </Typography>
                                <div style={{ minHeight: '250px', maxHeight: '250px', margin: '0 auto' }}>
                                    <Bar data={barData} />
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="col">
                        <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="user table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Employe</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>CompletedArts</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>ImprogressArt</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>TotalArtWorks</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userArts.map((row) => (
                                        <TableRow key={row._id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell component="th" scope="row" sx={{ textAlign: 'center' }}>
                                                {row.ownerName}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <span style={{ color: "green" }}>  {row.completedArts} </span>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <span style={{ color: "blue" }}>   {row.inProgressArts} </span>
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                {row.totalArts}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div></div>
            </div>
        </div>
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
