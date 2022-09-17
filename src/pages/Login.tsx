import { Typography, Button, TextField, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import house from "../assets/house.jpeg";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("isLoggedIn", "true")
        navigate("/");
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
                            // name="email"
                            label="Email"
                            placeholder="someone@example.com"
                            sx={{ width: "100%" }}
                            // onChange={(e: any) => {handleChange(e)}}
                            // value={email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            // name="password"
                            type="password"
                            label="Password"
                            sx={{ width: "100%" }}
                            // onChange={(e: any) => {handleChange(e)}}
                            // value={password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={handleLogin}
                            variant="outlined"
                            sx={{ width: "100%", height: "50px" }}
                        >
                            Log In
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            Don't have an account?{" "}
                            <span>
                                <Link to="/signup">
                                    <Button variant="text">Sign Up</Button>
                                </Link>
                            </span>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Login;
