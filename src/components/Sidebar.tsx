import { Grid, Paper, Box, Button } from "@mui/material";
import { Logout, House, Chat, Person } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import Spot from "../assets/Spot.png";
import { UserPreferences } from "../interfaces/ProfileSettings.interface";

Amplify.configure(awsconfig);

interface SideBarProps {
    children?: React.ReactNode;
}

function SideBar({ children }: SideBarProps) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await Auth.signOut();
            console.log("logged out");
            localStorage.setItem("isLoggedIn", "false");
            navigate("/login");
        } catch (error) {
            console.log("error signing out", error);
        }
    };

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid item xs={2}>
                <Paper sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ width: "100%" }}>
                            <img src={Spot} width="100%"></img>
                            <Link to="/tenant">
                                <Button
                                    startIcon={<House />}
                                    sx={{ width: "100%", height: "50px" }}
                                >
                                    Tenant
                                </Button>
                            </Link>
                            <Link to="/landlord">
                                <Button
                                    startIcon={<House />}
                                    sx={{ width: "100%", height: "50px" }}
                                >
                                    Landlord
                                </Button>
                            </Link>
                            <Button
                                startIcon={<Chat />}
                                sx={{ width: "100%", height: "50px" }}
                            >
                                Chat
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Link to="/">
                                <Button
                                    startIcon={<Person />}
                                    sx={{ width: "100%", height: "50px" }}
                                >
                                    Profile
                                </Button>
                            </Link>
                            <Button
                                onClick={handleLogout}
                                startIcon={<Logout />}
                                sx={{ width: "100%", height: "50px" }}
                            >
                                Log Out
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid
                item
                xs={10}
                sx={{ padding: "2%", maxHeight: "100vh", overflowY: "scroll" }}
            >
                {children}
            </Grid>
        </Grid>
    );
}

export default SideBar;
