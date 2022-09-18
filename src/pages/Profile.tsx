import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import {
    Logout,
    Edit,
    Bathroom,
    BedroomParent,
    WifiOutlined,
    AcUnitOutlined,
    KitchenOutlined,
    LocalParkingOutlined,
} from "@mui/icons-material";
import SideBar from "../components/Sidebar";
import Listing from "../components/Listing";
import TabPanel from "../components/TabPanel";
import Amenities from "../components/Amenities";
import Heading from "../components/Heading";
import house from "../assets/house.jpeg";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import { UserPreferences } from "../interfaces/ProfileSettings.interface";

Amplify.configure(awsconfig);

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

function Profile() {
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
    const [tabValue, setTabValue] = useState(0);
    const [settings, setSettings] = useState<UserPreferences>({
        price: { lower: 600, higher: 1500 },
        duration: { lower: 4, higher: 8 },
        locations: [
            {
                address: "110 University Ave W, Waterloo, ON N2L 3E2",
                radius: 7,
            },
            {
                address: "330 Phillip St, Waterloo, ON N2L 3W9",
                radius: 3,
            },
            {
                address: "256 Phillip St, Waterloo, ON N2L 6B6",
                radius: 4,
            },
        ],
        amenities: [
            { icon: <WifiOutlined />, text: "Wifi", selected: true },
            { icon: <AcUnitOutlined />, text: "AC", selected: true },
            { icon: <KitchenOutlined />, text: "Kitchen", selected: true },
            { icon: <LocalParkingOutlined />, text: "Parking", selected: true },
        ],
        rooms: [
            {
                icon: <BedroomParent />,
                name: "Bedroom",
                num: 5,
            },
            {
                icon: <Bathroom />,
                name: "Bathroom",
                num: 2,
            },
        ],
    });
    return (
        <SideBar>
            <Card>
                <CardMedia
                    height="300"
                    component="img"
                    image={house}
                ></CardMedia>
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
                            <Avatar
                                sx={{ width: 150, height: 150 }}
                                src="https://media-exp1.licdn.com/dms/image/D5603AQHzmHu4Yv4YPw/profile-displayphoto-shrink_400_400/0/1659640944888?e=1669248000&v=beta&t=l5dTiA_2IczNlLMeAYPyzR-Gp3zwCcandJI8XghxB7I"
                            >
                                RL
                            </Avatar>
                            <Typography variant="h2" fontWeight={400}>
                                Ryan Li
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                            <Link to="edit">
                                <Button
                                    variant="contained"
                                    sx={{ height: "40px" }}
                                    startIcon={<Edit />}
                                >
                                    Edit Profile
                                </Button>
                            </Link>
                            <Button
                                variant="contained"
                                sx={{ height: "40px" }}
                                onClick={handleLogout}
                                startIcon={<Logout />}
                            >
                                Logout
                            </Button>
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
                            <Tab label="Properties" {...a11yProps(1)} />
                            <Tab label="Preferences" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabValue} index={0}>
                        I’m leaving my current apartment because I want to live
                        within walking distance of my work. My current apartment
                        is a 30-minute drive away, and my lease is expiring at
                        the end of the month. My next apartment will be a
                        long-term commitment, as I don’t plan on leaving the
                        area or switching jobs.
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Grid
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                            <Grid item xs={2} sm={4} md={4}>
                                <Listing
                                    name="159 Wellesley"
                                    location="Toronto, ON"
                                    image="https://shared-s3.property.ca/public/images/listings/optimized/c5341710/mls/c5341710_1.jpg?v=2"
                                    owned={true}
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <Listing
                                    name="501 Yonge"
                                    location="Toronto, ON"
                                    image="https://cdn.skyrisecities.com/sites/default/files/images/projects/799/799-76767.jpg"
                                    owned={true}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
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
                                                    (settings.price.lower *
                                                        100) /
                                                    3000,
                                                label: `$${settings.price.lower}`,
                                            },
                                            {
                                                value:
                                                    (settings.price.higher *
                                                        100) /
                                                    3000,
                                                label: `$${settings.price.higher}`,
                                            },
                                        ]}
                                        step={10}
                                        value={[
                                            (settings.price.lower * 100) / 3000,
                                            (settings.price.higher * 100) /
                                                3000,
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
                                            (settings.duration.lower * 100) /
                                                12,
                                            (settings.duration.higher * 100) /
                                                12,
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
        </SideBar>
    );
}

export default Profile;
