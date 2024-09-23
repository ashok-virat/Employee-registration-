import { Button, Checkbox, FormControlLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./admin.css";
import { useRef } from "react";
import useToggle from './useToggle'

const SignUp = () => {
    const { status: isShowPass, toggleStatus: toggleShow } = useToggle();
    const userFirstName = useRef("");
    const userLastName = useRef("");
    const userEmailId = useRef("");
    const userName = useRef("");
    const userPass = useRef("");

    const handleSignUp = async () => {
        console.log(userFirstName)
    };

    return (
        <div className="signup-signin-wrapper">
            <div className="signup-signin-child-wrapper">
                <h2 className="text-center">Admin Signup</h2>
                <div className="first_last_name_wrapper mb-3">
                    <div className="d-flex flex-column">
                        <label className="text-start pb-2">First Name *</label>
                        <TextField
                            required
                            id="first-name-text-field"
                            placeholder="First name"
                            inputRef={userFirstName}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label className="text-start pb-2">Last Name *</label>
                        <TextField
                            required
                            id="last-name-text-field"
                            placeholder="Last name"
                            inputRef={userLastName}
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
                    />
                </div>
                <div className="d-flex flex-column mb-3">
                    <label className="text-start pb-2">Username *</label>
                    <TextField
                        required
                        id="username-text-field"
                        placeholder="Username"
                        inputRef={userName}
                    />
                </div>
                <div className="d-flex flex-column mb-3">
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
                        onClick={handleSignUp}
                    >
                        Create account
                    </Button>
                    <div>
                        <span className="px-2">(or)</span>
                        <label>
                            Already have account?{" "}
                            <label
                                className="text-primary pointer"
                                onClick={() => { console.log('hi') }}
                            >
                                Login
                            </label>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
