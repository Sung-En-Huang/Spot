import { useState } from "react";
import { Typography, Button, TextField, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import house from "../assets/house.jpeg";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        const username = email;
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                },
                autoSignIn: { enabled: true },
            });
            navigate("/");
            console.log(user);
        } catch (error) {
            console.log("error signing up:");
        }
    };
    return (
        <Grid
            container
            sx={{
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Grid
                item
                xs={6}
                sx={{
                    backgroundImage: `url(${house})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    height: "100%",
                }}
            ></Grid>
            <Grid item xs={6} sx={{ padding: "10%" }}>
                <Grid container direction="column" spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4">
                            Find your dream house
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jane Doe"
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    label="Email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="someone@example.com"
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            sx={{ width: "100%" }}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField
                            required
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            label="Confirm Password"
                            sx={{ width: "100%" }}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            sx={{ width: "100%", height: "50px" }}
                            onClick={handleSignup}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Already have an account? {/* <span> */}
                            <Link to="/">
                                <Button variant="text">Log In</Button>
                            </Link>
                            {/* </span> */}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Signup;
