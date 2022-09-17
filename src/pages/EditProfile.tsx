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
    Checkbox,
    TextField,
} from "@mui/material";
import {
    Bathroom,
    BedroomParent,
    WifiOutlined,
    AcUnitOutlined,
    KitchenOutlined,
    LocalParkingOutlined,
    LocationSearching,
    CheckBox,
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

// represents a location listing in the preference pane
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

interface Location {
    address: string;
    radius: number;
}

interface Amenity {
    icon: React.ReactNode;
    text: string;
    selected: boolean;
}

interface Room {
    icon: React.ReactNode;
    name: string;
    num: number;
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
    locations: Location[];
    amenities: Amenity[];
    rooms: Room[];
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
        walkScore: 80,
    });

    const [newLocation, setNewLocation] = useState<Location>({
        address: "",
        radius: 0,
    });

    // handles change for price and duration sliders
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
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

    // handles change for location radius sliders
    const handleLocationRadiusChange = (
        event: Event,
        newValue: number | number[],
        id: number
    ) => {
        if (event.target !== null) {
            let newLocations = settings.locations;
            // change the nth location with matching id
            newLocations.map((location, index) => {
                if (index === id && !Array.isArray(newValue)) {
                    location.radius = newValue;
                }
            });
            setSettings({ ...settings, locations: newLocations });
        }
    };

    // deletes a location from preferences
    const handleDeleteLocation = (event: Event, id: number) => {
        if (event.target !== null) {
            let newLocations = settings.locations;
            // delete the location with matching id
            newLocations.splice(id, 1);
            setSettings({ ...settings, locations: newLocations });
        }
    };

    // add new location with a preferred radius to preferences
    const handleAddLocation = () => {
        let newLocations = settings.locations;
        newLocations.push({
            address: newLocation.address,
            radius: newLocation.radius,
        });
        setSettings({ ...settings, locations: newLocations });
        setNewLocation({ address: "", radius: 0 }); // reset field
    };

    // toggles amenity preference
    const handleAmenityToggle = (id: number) => {
        let newAmenities = settings.amenities;
        newAmenities.map((amenity, index) => {
            if (index === id) {
                amenity.selected = !amenity.selected;
            }
        });
        setSettings({ ...settings, amenities: newAmenities });
    };

    const handleRoomSlider = (
        event: Event,
        newValue: number | number[],
        name: string
    ) => {
        let newRooms = settings.rooms;
        newRooms.map((room) => {
            if (room.name === name) {
                room.num = !Array.isArray(newValue) ? newValue : 0;
            }
        });
        setSettings({ ...settings, rooms: newRooms });
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
                                    onChange={handleSliderChange}
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
                                    onChange={handleSliderChange}
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
                                        deleteLocation={(e: Event) =>
                                            handleDeleteLocation(e, index)
                                        }
                                        handleChange={
                                            handleLocationRadiusChange
                                        }
                                        index={index} // used to identify slider for handle change
                                    />
                                );
                            })}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "20px",
                                }}
                            >
                                <TextField
                                    placeholder="Address "
                                    onChange={(e) => {
                                        setNewLocation({
                                            ...newLocation,
                                            address: e.target.value,
                                        });
                                    }}
                                    value={newLocation.address}
                                    sx={{ flexGrow: 1 }}
                                />
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
                                                value: newLocation.radius,
                                                label: `${
                                                    newLocation.radius / 10 // scale down to between 0-10km
                                                } km`,
                                            },
                                        ]}
                                        onChange={(
                                            e: Event,
                                            value: number | number[]
                                        ) => {
                                            setNewLocation({
                                                ...newLocation,
                                                radius: !Array.isArray(value)
                                                    ? value
                                                    : 0,
                                            });
                                        }}
                                        value={newLocation.radius}
                                        sx={{ width: "70%" }}
                                    />
                                    <Typography>10+ km</Typography>
                                    <Button onClick={handleAddLocation}>
                                        Add
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Heading text="Amenities" />
                            <Grid
                                container
                                spacing={2}
                                sx={{ paddingX: "20px" }}
                            >
                                {settings.amenities.map((amenity, index) => (
                                    <Grid item xs={6}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Amenities
                                                icon={amenity.icon}
                                                text={amenity.text}
                                                required={amenity.selected}
                                            />
                                            <Checkbox
                                                checked={amenity.selected}
                                                onChange={() =>
                                                    handleAmenityToggle(index)
                                                }
                                            />
                                        </Box>
                                    </Grid>
                                ))}
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
                                {settings.rooms.map((room) => (
                                    <Box
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        <Box
                                            sx={{ display: "flex", gap: "5px" }}
                                        >
                                            {room.icon}
                                            <Typography>{room.name}</Typography>
                                        </Box>
                                        <Slider
                                            size="small"
                                            valueLabelDisplay="auto"
                                            step={1}
                                            marks
                                            min={0}
                                            max={10}
                                            value={room.num}
                                            onChange={(
                                                e: Event,
                                                newValue: number | number[]
                                            ) =>
                                                handleRoomSlider(
                                                    e,
                                                    newValue,
                                                    room.name
                                                )
                                            }
                                        />
                                    </Box>
                                ))}
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
