import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    IconButton,
    Rating,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";

interface ListingProps {
    name: string;
    location: string;
    image: string;
    owned: boolean;
    handleSwipe: any;
}

function Listing({ name, location, image, owned, handleSwipe }: ListingProps) {
    return (
        <Card>
            <CardMedia component="img" image={image} height="300" />
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant="h5">{name}</Typography>
                        <Rating value={4} readOnly />
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h6">$1,200 / month</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {location}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
            <CardActions>
                <Button>View</Button>
                {owned ? (
                    <Button>Edit</Button>
                ) : (
                    <Box sx={{ display: "flex", gap: "10px" }}>
                        <div onClick={handleSwipe}>
                            <IconButton color="success">
                                <Check />
                            </IconButton>
                        </div>
                        <div onClick={handleSwipe}>
                            <IconButton color="error">
                                <Close />
                            </IconButton>
                        </div>
                    </Box>
                )}
            </CardActions>
        </Card>
    );
}

export default Listing;
