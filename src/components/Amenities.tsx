import { Box, Typography } from "@mui/material";

interface PropType {
    icon: React.ReactNode;
    text: string;
}

function Amenities({ icon, text }: PropType) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
            }}
        >
            {icon}
            <Typography variant="overline">{text}</Typography>
        </Box>
    );
}

export default Amenities;
