import { useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    Avatar,
    Typography,
    Slider,
    Chip,
} from "@mui/material";
import {
    Bed,
    Bathroom,
    BedroomParent,
    WifiOutlined,
    AcUnitOutlined,
    KitchenOutlined,
    LocalParkingOutlined,
    LocationSearching,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import SideBar from "../components/Sidebar";
import Heading from "../components/Heading";
import Amenities from "../components/Amenities";

interface LocationProps {
    location: string;
    radius: number;
    handleChange: any;
    index: number;
    deleteLocation: any;
}

function Location({
    location,
    radius,
    handleChange,
    deleteLocation,
    index,
}: LocationProps) {
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
                            value: radius,
                            label: `${radius / 10} km`,
                        },
                    ]}
                    onChange={(
                        e: Event,
                        value: number | number[],
                        id: number
                    ) => {
                        handleChange(e, value, index);
                    }}
                    value={radius}
                    sx={{ width: "70%" }}
                />
                <Typography>10+ km</Typography>
                <Button onClick={deleteLocation}>Delete</Button>
            </Box>
        </Box>
    );
}

interface ProfileSettings {
    price: {
        lower: number;
        higher: number;
    };
    duration: {
        lower: number;
        higher: number;
    };
    locations: {
        address: string;
        radius: number;
    }[];
    amenities: {
        wifi: boolean;
        kitchen: boolean;
        ac: boolean;
        parking: boolean;
    };
    rooms: {
        bedrooms: number;
        bathrooms: number;
        beds: number;
    };
    walkScore: number;
}

function EditProfile() {
    const [settings, setSettings] = useState<ProfileSettings>({
        price: { lower: 20, higher: 70 },
        duration: { lower: 20, higher: 70 },
        locations: [
            {
                address: "110 University Ave W, Waterloo, ON N2L 3E2",
                radius: 70,
            },
            {
                address: "330 Phillip St, Waterloo, ON N2L 3W9",
                radius: 30,
            },
            {
                address: "256 Phillip St, Waterloo, ON N2L 6B6",
                radius: 40,
            },
        ],
        amenities: {
            wifi: true,
            kitchen: true,
            ac: true,
            parking: true,
        },
        rooms: {
            bedrooms: 5,
            bathrooms: 2,
            beds: 5,
        },
        walkScore: 80,
    });

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (event.target !== null) {
            const target = event.target as HTMLInputElement;
            setSettings({
                ...settings,
                [target.name]: {
                    lower: Array.isArray(newValue) ? newValue[0] : newValue,
                    higher: Array.isArray(newValue) ? newValue[1] : newValue,
                },
            });
        }
    };

    const handleLocationChange = (
        event: Event,
        newValue: number | number[],
        id: number
    ) => {
        if (event.target !== null) {
            let newLocations = settings.locations;
            // change the nth location with matching id
            newLocations.map((location, index) => {
                if (index == id && !Array.isArray(newValue)) {
                    location.radius = newValue;
                }
            });
            setSettings({ ...settings, locations: newLocations });
        }
    };

    const handleDeleteLocation = (event: Event, id: number) => {
        if (event.target !== null) {
            let newLocations = settings.locations;
            // delete the location with matching id
            newLocations.splice(id, 1);
            setSettings({ ...settings, locations: newLocations });
        }
    };

    return (
        <SideBar>
            <Card>
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
                            }}
                        >
                            <Avatar sx={{ width: 150, height: 150 }}>JS</Avatar>
                            <Typography variant="h2" fontWeight={400}>
                                Joe Smith
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                            <Link to="/">
                                <Button
                                    variant="contained"
                                    sx={{ height: "40px" }}
                                >
                                    Save
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            borderBottom: 1,
                            borderColor: "divider",
                            marginY: "20px",
                        }}
                    ></Box>
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
                                    name="price"
                                    size="small"
                                    onChange={handleChange}
                                    marks={[
                                        {
                                            value: settings.price.lower,
                                            label: `$${
                                                settings.price.lower * 100 // value is on scale of 1-100, price is in thousands
                                            }`,
                                        },
                                        {
                                            value: settings.price.higher,
                                            label: `$${
                                                settings.price.higher * 100
                                            }`,
                                        },
                                    ]}
                                    // step={10}
                                    value={[
                                        settings.price.lower,
                                        settings.price.higher,
                                    ]}
                                    sx={{ width: "100%" }}
                                />
                                <Typography>$10,000+</Typography>
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
                                <Typography>7 days</Typography>
                                <Slider
                                    name="duration"
                                    size="small"
                                    onChange={handleChange}
                                    marks={[
                                        {
                                            value: settings.duration.lower,
                                            label: `${Math.floor(
                                                (settings.duration.lower *
                                                    365) /
                                                    100 // rescale to 365 days
                                            )} days`,
                                        },
                                        {
                                            value: settings.duration.higher,
                                            label: `${Math.floor(
                                                (settings.duration.higher *
                                                    365) /
                                                    100
                                            )} days`,
                                        },
                                    ]}
                                    value={[
                                        settings.duration.lower,
                                        settings.duration.higher,
                                    ]}
                                    sx={{ width: "70%" }}
                                />
                                <Typography>365+ days</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Heading text="Location" />
                            {settings.locations.map((location, index) => {
                                return (
                                    <Location
                                        location={location.address}
                                        radius={location.radius}
                                        deleteLocation={handleDeleteLocation}
                                        handleChange={handleLocationChange}
                                        index={index} // used to identify slider for handle change
                                    />
                                );
                            })}
                        </Grid>
                        <Grid item xs={5}>
                            <Heading text="Amenities" />
                            <Grid
                                container
                                spacing={2}
                                sx={{ paddingX: "20px" }}
                            >
                                <Grid item xs={6}>
                                    <Amenities
                                        icon={<WifiOutlined />}
                                        text="Wi-Fi"
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Amenities
                                        icon={<AcUnitOutlined />}
                                        text="Air Conditioning"
                                        required={false}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Amenities
                                        icon={<KitchenOutlined />}
                                        text="Kitchen"
                                        required={true}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Amenities
                                        icon={<LocalParkingOutlined />}
                                        text="Parking"
                                        required={true}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <Heading text="Room Requirements" />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                }}
                            >
                                <Chip
                                    icon={<BedroomParent />}
                                    label={`${settings.rooms.bedrooms} Bedrooms`}
                                />
                                <Chip
                                    icon={<Bathroom />}
                                    label={`${settings.rooms.bathrooms} Bathrooms`}
                                />
                                <Chip
                                    icon={<Bed />}
                                    label={`${settings.rooms.beds} Beds`}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Heading text="Walk Score" />
                            <Typography variant="h2">
                                {settings.walkScore}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </SideBar>
    );
}

export default EditProfile;
