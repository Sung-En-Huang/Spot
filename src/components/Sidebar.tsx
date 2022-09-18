import { Grid, Paper, Box, Button } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import { Logout, House, Chat } from "@mui/icons-material";
import Amplify, { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import awsconfig from "../aws-exports";
import { ProfileSettings } from "../interfaces/ProfileSettings.interface";

Amplify.configure(awsconfig);

interface SideBarProps {
    children: React.ReactNode;
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
                            <Button
                                startIcon={<House />}
                                sx={{ width: "100%", height: "50px" }}
                            >
                                Tenant
                            </Button>
                            <Button
                                startIcon={<House />}
                                sx={{ width: "100%", height: "50px" }}
                            >
                                Landlord
                            </Button>
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
                            <Button
                                startIcon={<Settings />}
                                sx={{ width: "100%", height: "50px" }}
                            >
                                Settings
                            </Button>
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
            <Grid item xs={10} sx={{ padding: "2%" }}>
                {children}
            </Grid>
        </Grid>
    );
}

export default SideBar;
