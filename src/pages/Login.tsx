import { Typography, Button, TextField, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import house from "../assets/house.jpeg";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const user = await Auth.signIn(email, password);
            localStorage.setItem("isLoggedIn", "true");
            navigate("/");
        } catch (error) {
            console.log("there was an error logging in", error);
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
                        <TextField
                            id="email"
                            label="Email"
                            value={email}
                            placeholder="someone@example.com"
                            sx={{ width: "100%" }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            id="password"
                            label="Password"
                            value={password}
                            sx={{ width: "100%" }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            id="signInButton"
                            onClick={handleLogin}
                            variant="outlined"
                            sx={{ width: "100%", height: "50px" }}
                        >
                            Log In
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Don't have an account? {/* <span> */}
                            <Link to="/signup">
                                <Button variant="text">Sign Up</Button>
                            </Link>
                            {/* </span> */}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Login;
