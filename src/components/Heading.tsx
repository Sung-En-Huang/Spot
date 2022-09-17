import { Typography, Divider } from "@mui/material";

interface HeadingProps {
    text: string;
}

function Heading({ text }: HeadingProps) {
    return (
        <>
            <Typography variant="h6">{text}</Typography>
            <Divider sx={{ marginY: "10px" }} />
        </>
    );
}

export default Heading;
