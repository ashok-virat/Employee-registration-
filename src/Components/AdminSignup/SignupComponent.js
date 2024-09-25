import { Button, Checkbox, FormControlLabel, CircularProgress, Snackbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./admin.css";
import { useRef, useState } from "react";
import useToggle from './useToggle'
import { useNavigate } from "react-router-dom";
import UserService from './../../Service/UserService'

const SignUp = () => {
    const navigate = useNavigate();
    const { status: isShowPass, toggleStatus: toggleShow } = useToggle();
    const userFirstName = useRef("");
    const userLastName = useRef("");
    const userEmailId = useRef("");
    const userName = useRef("");
    const userPass = useRef("");
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(false)

    const validateForm = () => {
        const newErrors = {};
        newErrors.firstName = !userFirstName.current.value ? "First name is required" : "";
        newErrors.lastName = !userLastName.current.value ? "Last name is required" : "";
        newErrors.email = !userEmailId.current.value ? "Email is required" : "";
        newErrors.username = !userName.current.value ? "Username is required" : "";
        newErrors.password = !userPass.current.value
            ? "Password is required" || ""
            : userPass.current.value.length < 6
                ? "Password must be at least 6 characters" || ""
                : "";
        setErrors(newErrors);
        return Object.values(newErrors).every(value => value === '' || value === null || value === undefined)
    };

    const handleSignUp = async () => {
        const validationErrors = validateForm();
        if (!validationErrors) {
            return;
        }

        let employee = {
            userName: userName.current.value,
            email: userEmailId.current.value,
            userType: 'employe',
            isApproved: false,
            password: userPass.current.value,
            firstName: userFirstName.current.value,
            lastName: userLastName.current.value
        }
        try {
            setLoading(true)
            await UserService.signup(employee)
            setLoading(false)
            navigate('/signin')
        }
        catch {
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
                message="Invalid data"
                onClose={handleClose}
            />
            <div className="row" style={{ height: "100vh" }}>
                <div className="col d-flex flex-column justify-content-center align-items-center text-white position-relative" style={{ background: 'black', padding: '20px', overflow: 'hidden' }}>
                    <h2 className="animate-heading">Welcome to Employee Registration</h2>
                    <p className="text-center animate-description">
                        Join our team and help us create the future of work! Please fill out the form to register for your new role.
                    </p>

                    <div className="animated-shapes">
                        <div className="shape"></div>
                        <div className="shape"></div>
                        <div className="shape"></div>
                    </div>
                </div>
                <div className="signup-signin-wrapper align-content-center col d-flex justify-content-center">
                    <div className="signup-signin-child-wrapper">
                        <h2 className="text-center">Register</h2>
                        <div className="first_last_name_wrapper mb-3 mt-3">
                            <div className="d-flex flex-column">
                                <label className="text-start pb-2">First Name *</label>
                                <TextField
                                    required
                                    id="first-name-text-field"
                                    placeholder="First name"
                                    inputRef={userFirstName}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    onChange={() => {
                                        validateForm()
                                    }}
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <label className="text-start pb-2">Last Name *</label>
                                <TextField
                                    required
                                    id="last-name-text-field"
                                    placeholder="Last name"
                                    inputRef={userLastName}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    onChange={() => {
                                        validateForm()
                                    }}
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-column mb-3">
                            <label className="text-start pb-2">Email *</label>
                            <TextField
                                required
                                id="email-text-field"
                                placeholder="Email id"
                                inputRef={userEmailId}
                                error={!!errors.email}
                                helperText={errors.email}
                                onChange={() => {
                                    validateForm()
                                }}
                            />
                        </div>
                        <div className="d-flex flex-column mb-3">
                            <label className="text-start pb-2">Username *</label>
                            <TextField
                                required
                                id="username-text-field"
                                placeholder="Username"
                                inputRef={userName}
                                error={!!errors.username}
                                helperText={errors.username}
                                onChange={() => {
                                    validateForm()
                                }}
                            />
                        </div>
                        <div className="d-flex flex-column mb-3">
                            <label className="text-start pb-2">Password *</label>
                            <TextField
                                required
                                id="p-text-field"
                                placeholder="Password"
                                type={isShowPass ? "text" : "password"}
                                inputRef={userPass}
                                error={!!errors.password}
                                helperText={errors.password}
                                onChange={() => {
                                    validateForm()
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={isShowPass} size="small" />}
                                label="Show password"
                                onClick={toggleShow}
                            />
                        </div>
                        <div className="pt-3 d-flex justify-content-start align-items-baseline">
                            <div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="text-center"
                                    onClick={handleSignUp}
                                >
                                    {loading ? <CircularProgress className="mx-5" size={24} sx={{ color: 'white' }} /> : "Create account"}
                                </Button>
                            </div>
                            <div>
                                <span className="px-2">(or)</span>
                                <label>
                                    Already have an account?{" "}
                                    <label
                                        className="text-primary"
                                        onClick={() => { navigate('/signin') }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Login
                                    </label>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
