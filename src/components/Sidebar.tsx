import { Grid, Paper, Box, Button } from "@mui/material";
import { Logout, House, Chat, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface SideBarProps {
    children: React.ReactNode;
}

function SideBar({ children }: SideBarProps) {
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
