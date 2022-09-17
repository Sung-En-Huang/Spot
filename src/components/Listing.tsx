import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
} from "@mui/material";
import house from "../assets/house.jpeg";

function Listing() {
    return (
        <Card>
            <CardMedia component="img" image={house} />
            <CardContent>
                <Typography variant="h5">House</Typography>
                <Typography variant="body2">Waterloo, ON</Typography>
            </CardContent>
            <CardActions>
                <Button>View</Button>
                <Button>Edit</Button>
            </CardActions>
        </Card>
    );
}

export default Listing;
