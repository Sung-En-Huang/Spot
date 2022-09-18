import { useState } from "react";
import { Box } from "@mui/material";
import {
    Bathroom,
    BedroomParent,
    WifiOutlined,
    AcUnitOutlined,
    KitchenOutlined,
    LocalParkingOutlined,
} from "@mui/icons-material";
import SideBar from "../components/Sidebar";
import TenantProfile from "../components/TenantProfile";
import {
    TenantProfileProps,
    UserPreferences,
    Location,
} from "../interfaces/ProfileSettings.interface";

const seedrandom = require("seedrandom");
let seedrng = seedrandom("spot");

function matchAlgorithm(
    matchPreferences: UserPreferences,
    currentUserPreferences: UserPreferences
): boolean {
    let ret = true;
    // highest price tenant willing to pay is lower than lowest user is willing to go
    if (matchPreferences.price.higher < currentUserPreferences.price.lower)
        ret = false;

    return ret;
}

function rng(min: number, max: number): number {
    return Math.floor(seedrng() * (max - min) + min);
}

function pickRandomLocation(): Location {
    let locations: Location[] = [
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
    ];
    return locations[rng(0, locations.length - 1)];
}

function randomPreferences(): UserPreferences {
    return {
        price: { lower: rng(5, 9) * 100, higher: rng(9, 14) * 100 },
        duration: { lower: rng(4, 6), higher: rng(9, 12) },
        locations: [pickRandomLocation()],
        amenities: [
            { icon: <WifiOutlined />, text: "Wifi", selected: true },
            { icon: <AcUnitOutlined />, text: "AC", selected: true },
            { icon: <KitchenOutlined />, text: "Kitchen", selected: true },
            {
                icon: <LocalParkingOutlined />,
                text: "Parking",
                selected: true,
            },
        ],
        rooms: [
            {
                icon: <BedroomParent />,
                name: "Bedroom",
                num: rng(1, 4),
            },
            {
                icon: <Bathroom />,
                name: "Bathroom",
                num: rng(1, 2),
            },
        ],
    };
}

// represents sample matches from AWS
let sampleMatches: TenantProfileProps[] = [
    {
        firstName: "James",
        lastName: "Song",
        avatar: "https://media-exp1.licdn.com/dms/image/C4E03AQEGCjuFuZx0GA/profile-displayphoto-shrink_400_400/0/1627949857793?e=1669248000&v=beta&t=tpckTFQhdsD4r7erJxmk9Uo_peYPh9XNLMikEWKvnpg",
        banner: "https://uwaterloo.ca/news/sites/ca.news/files/styles/feature_large/public/261-perkins_will_engineering_vii.jpg?itok=s9be-tKZ",
        bio: "I am looking to relocate from an apartment to a modest single-family home that is in walking distance to restaurants, shops and stores.  As a working professional, I am looking for a low maintenance, newer home, in a quiet and friendly neighborhood.  I am a responsible tenant, looking for long-term housing.",
        preferences: randomPreferences(),
    },
    {
        firstName: "Andrew",
        lastName: "Zhang",
        avatar: "https://media-exp1.licdn.com/dms/image/C5603AQHfzDEIiH0EoA/profile-displayphoto-shrink_400_400/0/1662006347977?e=1669248000&v=beta&t=B3vM9TagW86g8PX6DJ2PjCo3yf5buDCgGV-pFcEoafc",
        banner: "https://media.radissonhotelsamericas.com/image/destination-pagesus/localattraction/20828-139885-f72599578_3xl.jpg?impolicy=HomeHero&gravity=South",
        bio: "I was born and raised in Ohala, CA and have lived and worked in Fern Valley, CA for the last 5 years. I am a Dialysis Technician at Mercy Dialysis Clinic, where I have worked for 3 years. I worked at Mercy General Hospital at Technician’s Assistant before joining Mercy Dialysis Clinic. When I am not working, I enjoy hiking and playing on my company’s softball team. I do not have any pets. I do not have any roommates. I have never been evicted, arrested or convicted for any reason.  I am happy to provide a letter of reference from my current or previous landlords regarding their experience with me as a tenant.",
        preferences: randomPreferences(),
    },
];

function Tenant() {
    const [matches, setMatches] = useState<TenantProfileProps[]>(sampleMatches);
    return (
        <SideBar>
            <Box display="flex" gap="20px" flexDirection="column">
                {matches.map((match) => {
                    return (
                        <TenantProfile
                            firstName={match.firstName}
                            lastName={match.lastName}
                            avatar={match.avatar}
                            banner={match.banner}
                            bio={match.bio}
                            preferences={match.preferences}
                        />
                    );
                })}
            </Box>
        </SideBar>
    );
}

export default Tenant;
