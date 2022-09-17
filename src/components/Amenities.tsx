import { Box, Checkbox, Typography } from "@mui/material";

interface PropType {
    icon: React.ReactNode;
    required: boolean;
    text: string;
}

function Amenities({ icon, required, text }: PropType) {
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
            {/* <Checkbox checked={required}></Checkbox> */}
        </Box>
    );
}

export default Amenities;
