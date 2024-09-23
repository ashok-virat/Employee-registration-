import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useRef, useState } from "react";
import useToggle from "./useToggle";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    const { status: isShowPass, toggleStatus: toggleShow } = useToggle();
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);


    const userName = useRef("");
    const userPass = useRef("");

    const handleLogin = async () => {
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = () => {

    }

    return (
        <div className="signup-signin-wrapper">
            <div className="signup-signin-child-wrapper">
                <h2 className="text-center">Login</h2>
                <div className="d-flex flex-column">
                    <label className="text-start pb-2">Username *</label>
                    <TextField
                        required
                        id="username-text-field"
                        placeholder="Username"
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
                    <Button
                        variant="contained"
                        className="text-center"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
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
    );
};

export default SignIn;
