import { useState } from "react";
import { Box } from "@mui/material";
import SideBar from "../components/Sidebar";
import LandlordListing from "../components/LandlordListing";
import {} from "../interfaces/ProfileSettings.interface";

interface LandlordListingProps {
    name: string;
    location: string;
    image: string;
    owned: boolean;
    handleSwipe: any;
}

function Landlord() {
    const [listings, setListings] = useState<LandlordListingProps[]>([
        {
            name: "Blair House | Rez-One ",
            location: "Waterloo, ON",
            image: "https://pbs.twimg.com/media/ExwLVkNXEAsiT82.jpg:large",
            owned: false,
            handleSwipe: null,
        },
        {
            name: "ICON 330",
            location: "Waterloo, ON",
            image: "https://www.iconstudents.com/img/icon-building-2.jpg",
            owned: false,
            handleSwipe: null,
        },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <SideBar>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                }}
            >
                {listings.map((listing, index) => (
                    <Box
                        display={index !== currentIndex ? "none" : "auto"}
                        width="100%"
                    >
                        <LandlordListing
                            name={listing.name}
                            location={listing.location}
                            image={listing.image}
                            owned={listing.owned}
                            handleSwipe={() => {
                                setCurrentIndex(currentIndex + 1);
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </SideBar>
    );
}

export default Landlord;
