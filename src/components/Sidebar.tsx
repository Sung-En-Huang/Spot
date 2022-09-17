import { Grid, Paper, Box, Button } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import { Logout, House, Chat } from "@mui/icons-material";

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
