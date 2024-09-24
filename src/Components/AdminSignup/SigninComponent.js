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
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)
            if (data?.user?.userType === 'admin') {
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
                <div className="col d-flex flex-column justify-content-center align-items-center text-white position-relative" style={{ background: 'black', padding: '20px', overflow: 'hidden' }}>
                    <h2 className="animate-heading">Welcome Back!</h2>
                    <p className="text-center animate-description">
                        Please log in to access your account and continue where you left off.
                    </p>

                    <div className="animated-shapes">
                        <div className="shape"></div>
                        <div className="shape"></div>
                        <div className="shape"></div>
                    </div>
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
                                <div>  <Button
                                    type="submit"
                                    variant="contained"
                                    className="text-center"
                                    onClick={handleLogin}
                                >
                                    {loading ? <CircularProgress className="mx-2" size={24} sx={{
                                        color: 'white',
                                    }} /> : "Login"}
                                </Button></div>
                                <div>
                                    <span className="px-2">(or)</span>
                                    <label>
                                        Don't have account?{" "}
                                        <label
                                            className="text-primary"
                                            style={{ cursor: 'pointer' }}
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
