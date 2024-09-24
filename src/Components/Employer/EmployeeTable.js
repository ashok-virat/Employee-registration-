import * as React from "react";
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import {
    Typography,
    Chip,
    CircularProgress
} from "@mui/material";
import { useState } from "react";
import UserService from "../../Service/UserService";
import moment from 'moment-timezone';

const EmployeeTable = ({ arts, updateArt }) => {

    const [loading, setLoading] = useState(false)

    const completeArt = async (art) => {
        try {
            setLoading(art._id)
            const data = await UserService.completeArt(art._id)
            setLoading(false)
            updateArt(data)
        }
        catch {
            setLoading(false)
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
                                {art.status === 'inProgress' ? loading === art._id ? <div style={{ textAlign: 'right' }}><CircularProgress size={20} sx={{
                                    color: 'black',
                                }} /></div>
                                    : <Chip color="primary" label="Complete the Art work" onClick={() => {
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


export default EmployeeTable