
import * as React from "react";
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
import { useState } from "react";
import UserService from "../../Service/UserService";

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

export default CreateArtPopup;