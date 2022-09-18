import React from "react";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import SideBar from "../components/Sidebar";
import Listing from "../components/Listing";

function Landlord() {
    return (
        <SideBar>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Listing
                        name="Blair House | Rez-One "
                        location="Waterloo, ON"
                        image="https://pbs.twimg.com/media/ExwLVkNXEAsiT82.jpg:large"
                        owned={false}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Listing
                        name="ICON 330"
                        location="Waterloo, ON"
                        image="https://www.iconstudents.com/img/icon-building-2.jpg"
                        owned={false}
                    />
                </Grid>
            </Grid>
        </SideBar>
    );
}

export default Landlord;
