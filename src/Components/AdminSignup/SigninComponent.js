import { Button, Checkbox, FormControlLabel, TextField, CircularProgress, Snackbar } from "@mui/material";
import { useRef, useState } from "react";
import useToggle from "./useToggle";
import { useNavigate } from "react-router-dom";
import UserService from './../../Service/UserService'
import "./admin.css";

const SignIn = () => {
    const navigate = useNavigate();

    const { status: isShowPass, toggleStatus: toggleShow } = useToggle();

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')


    const userName = useRef("");
    const userPass = useRef("");

    const handleLogin = async () => {
        try {
            setLoading(true)
            const { data } = await UserService.signin({ email: userName.current.value, password: userPass.current.value })
            localStorage.setItem('user', JSON.stringify(data))
            if (data?.userType === 'admin') {
                navigate('/admin')
            }
            else {
                navigate('/employe')
            }
            setLoading(false)
        }
        catch (e) {
            setErrorMessage(e.response.data)
            setError(true)
            setLoading(false)
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false)
    };

    return (
        <div className="container-fluid">
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={error}
                autoHideDuration={3000}
                message={errorMessage ? errorMessage : "Invalid username/password"}
                onClose={handleClose}
            />
            <div className="row" style={{ height: "100vh" }}>
                <div className="col" style={{ background: 'black' }}>


                </div>
                <div className="col align-content-center col d-flex justify-content-center">

                    <div className="signup-signin-wrapper">
                        <div className="signup-signin-child-wrapper">
                            <h2 className="text-center">Login</h2>
                            <div className="d-flex flex-column">
                                <label className="text-start pb-2">Email *</label>
                                <TextField
                                    required
                                    id="username-text-field"
                                    placeholder="Email"
                                    inputRef={userName}
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <>
                                    <label className="text-start pb-2">Password *</label>
                                    <TextField
                                        required
                                        id="p-text-field"
                                        placeholder="Password"
                                        type={isShowPass ? "text" : "password"}
                                        inputRef={userPass}
                                    />
                                </>
                                <FormControlLabel
                                    control={<Checkbox checked={isShowPass} size="small" />}
                                    label="Show password"
                                    onClick={toggleShow}
                                />
                            </div>
                            <div className="pt-3 d-flex justify-content-start align-items-baseline">
                                {loading ? <div style={{ width: "77px", textAlign: 'center' }}><CircularProgress size={24} sx={{
                                    color: 'black',
                                }} /> </div> : <Button
                                    variant="contained"
                                    className="text-center"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>}
                                <div>
                                    <span className="px-2">(or)</span>
                                    <label>
                                        Don't have account?{" "}
                                        <label
                                            className="text-primary pointer"
                                            onClick={() => {
                                                navigate('/')
                                            }}
                                        >
                                            Sign Up
                                        </label>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
