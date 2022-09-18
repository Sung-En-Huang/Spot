import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    IconButton,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import house from "../assets/house.jpeg";

interface ListingProps {
    name: string;
    location: string;
    image: string;
    owned: boolean;
}

function Listing({ name, location, image, owned }: ListingProps) {
    return (
        <Card>
            <CardMedia component="img" image={image} height="300" />
            <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body2">{location}</Typography>
            </CardContent>
            <CardActions>
                <Button>View</Button>
                {owned ? (
                    <Button>Edit</Button>
                ) : (
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <IconButton color="success">
                            <Check />
                        </IconButton>
                        <IconButton color="error">
                            <Close />
                        </IconButton>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
}

export default Listing;
