
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
import Typography from '@mui/material/Typography';
import { useNavigate, } from "react-router-dom";
import { Grid, CircularProgress, Chip, SvgIcon } from '@mui/material';
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

const UserTable = () => {
    ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
    const navigate = useNavigate();

    const [chartData, setChartData] = useState({
        inProgressCount: 0,
        completedCount: 0,
    });

    const [userArts, setUserArts] = useState([])

    const [loading, setLoading] = useState(false)


    const getArts = async () => {
        try {
            setLoading(true)
            const data = await UserService.getAllArts()
            const user = await UserService.getUserBasedArts()
            setLoading(false)
            setUserArts(user.data)
            setChartData({
                inProgressCount: data.data.inProgressCount,
                completedCount: data.data.completedCount,
            });
        }
        catch {
            setLoading(false)
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
    }, []);

    const [date, setDate] = useState(null)

    const getArtsByDate = React.useCallback(async () => {
        try {
            setLoading(true)
            const data = await UserService.getAllArts(date[0], date[1])
            const user = await UserService.getUserBasedArts(date[0], date[1])
            if (data?.data && Array.isArray(user.data)) {
                setUserArts(user.data)
                setChartData({
                    inProgressCount: data.data.inProgressCount,
                    completedCount: data.data.completedCount,
                });

            }
            else {
                setUserArts([])
                setChartData({
                    inProgressCount: 0,
                    completedCount: 0,
                })
            }
            setLoading(false)
        }
        catch {
            setLoading(false)
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
                            Dashboard - <span style={{ fontWeight: 900 }}>Total artworks {chartData.inProgressCount + chartData.completedCount}</span>
                        </Typography></span>
                        <Button variant="contained" onClick={() => {
                            navigate('/user')
                        }} >View Registered Users</Button></div>
                    <div className="d-flex align-content-center pt-3">
                        <LocalizationProvider className="pt-0" dateAdapter={AdapterDayjs}>
                            <DemoContainer value={date} components={['DateRangePicker']}>
                                <DateRangePicker value={date} onChange={(e) => {
                                    if (e && e.length && e[1]) {
                                        setDate(e)
                                    }
                                }} localeText={{ start: 'From', end: 'To' }} />
                            </DemoContainer>
                        </LocalizationProvider><div style={{ marginLeft: '10px' }} className="align-content-center"><Chip label="Clear" onClick={() => {
                            setDate([])
                            getArts()
                            setDate(null)
                        }} ></Chip><SvgIcon style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => {
                            if (date) {
                                getArtsByDate()
                            }
                            else {
                                getArts()
                            }
                        }} ><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4z" /></svg></SvgIcon></div> </div>
                    <Grid container spacing={3} className="mt-2">
                        {/* Pie Chart */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Art Work Progress
                                </Typography>
                                <div style={{ maxHeight: '270px', margin: '0 auto', }}>
                                    <Pie style={{ margin: '0 auto' }} data={pieData} />
                                </div>
                            </Paper>
                        </Grid>

                        {/* Bar Chart */}
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Art Status Overview
                                </Typography>
                                <div className="d-flex">
                                    <div style={{ minHeight: '270px', maxHeight: '250px', margin: '0 auto' }}>
                                        <Bar tyle={{ margin: '0 auto' }} height={600} width={600} data={barData} />
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="col">
                        {loading ? <div className="mt-5" style={{ textAlign: 'center' }}><CircularProgress size={35} sx={{
                            color: 'black',
                        }} /> </div> : <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                            <Table sx={{ minWidth: 650 }} aria-label="user table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Employe</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>CompletedArtWorks</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>ImprogressArtWorks</TableCell>
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
                        </TableContainer>}

                    </div></div>
            </div>
        </div>
    );
};

export default UserTable;