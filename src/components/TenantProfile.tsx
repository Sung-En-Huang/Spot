import React, { useState } from "react";
import {
    Grid,
    Box,
    Button,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Avatar,
    Tabs,
    Tab,
    Slider,
    Chip,
    IconButton,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import SideBar from "../components/Sidebar";
import TabPanel from "../components/TabPanel";
import Amenities from "../components/Amenities";
import Heading from "../components/Heading";
import house from "../assets/house.jpeg";
import {
    UserPreferences,
    TenantProfileProps,
} from "../interfaces/ProfileSettings.interface";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

interface LocationProps {
    location: string;
    radius: number;
}

function Location({ location, radius }: LocationProps) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Typography>{location}</Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                    width: "50%",
                }}
            >
                <Typography>0 km</Typography>
                <Slider
                    size="small"
                    marks={[
                        {
                            value: radius * 10,
                            label: `${radius} km`,
                        },
                    ]}
                    step={10}
                    value={radius * 10}
                    sx={{ width: "70%" }}
                />
                <Typography>10+ km</Typography>
            </Box>
        </Box>
    );
}

function TenantProfile({
    firstName,
    lastName,
    avatar,
    banner,
    bio,
    preferences,
}: TenantProfileProps) {
    const [tabValue, setTabValue] = useState(0);
    const [settings, setSettings] = useState<UserPreferences>(preferences);
    return (
        <Card>
            <CardMedia height="300" component="img" image={banner}></CardMedia>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            marginTop: "-80px",
                        }}
                    >
                        <Avatar sx={{ width: 150, height: 150 }} src={avatar}>
                            {firstName[0]}
                            {lastName[0]}
                        </Avatar>
                        <Typography variant="h2" fontWeight={400}>
                            {firstName} {lastName}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <IconButton color="success">
                            <Check />
                        </IconButton>
                        <IconButton color="error">
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        marginTop: "20px",
                    }}
                >
                    <Tabs
                        value={tabValue}
                        onChange={(
                            event: React.SyntheticEvent,
                            newValue: number
                        ) => {
                            setTabValue(newValue);
                        }}
                        aria-label="basic tabs example"
                    >
                        <Tab label="About" {...a11yProps(0)} />
                        <Tab label="Preferences" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    {bio}
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <Heading text="Price Range ($/month)" />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "15px",
                                }}
                            >
                                <Typography>$0</Typography>
                                <Slider
                                    size="small"
                                    marks={[
                                        {
                                            value:
                                                (settings.price.lower * 100) /
                                                3000,
                                            label: `$${settings.price.lower}`,
                                        },
                                        {
                                            value:
                                                (settings.price.higher * 100) /
                                                3000,
                                            label: `$${settings.price.higher}`,
                                        },
                                    ]}
                                    step={10}
                                    value={[
                                        (settings.price.lower * 100) / 3000,
                                        (settings.price.higher * 100) / 3000,
                                    ]}
                                    sx={{ width: "100%" }}
                                />
                                <Typography>$3,000+</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Heading text="Duration" />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "15px",
                                }}
                            >
                                <Typography>0 months</Typography>
                                <Slider
                                    size="small"
                                    marks={[
                                        {
                                            value:
                                                (settings.duration.lower *
                                                    100) /
                                                12,
                                            label: `${settings.duration.lower} months`,
                                        },
                                        {
                                            value:
                                                (settings.duration.higher *
                                                    100) /
                                                12,
                                            label: `${settings.duration.higher} months`,
                                        },
                                    ]}
                                    step={10}
                                    value={[
                                        (settings.duration.lower * 100) / 12,
                                        (settings.duration.higher * 100) / 12,
                                    ]}
                                    sx={{ width: "70%" }}
                                />
                                <Typography>12 months</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Heading text="Location" />
                            {settings.locations.map((location) => {
                                return (
                                    <Location
                                        location={location.address}
                                        radius={location.radius}
                                    />
                                );
                            })}
                        </Grid>
                        <Grid item xs={6}>
                            <Heading text="Amenities" />
                            <Grid
                                container
                                spacing={2}
                                sx={{ paddingX: "20px" }}
                            >
                                {settings.amenities.map((amenity) => (
                                    <Grid item xs={6}>
                                        <Amenities
                                            icon={amenity.icon}
                                            text={amenity.text}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Heading text="Room Requirements" />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                }}
                            >
                                {settings.rooms.map((room) => (
                                    <Chip
                                        icon={room.icon}
                                        label={`${room.num} ${room.name}s`}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </TabPanel>
            </CardContent>
        </Card>
    );
}

export default TenantProfile;
