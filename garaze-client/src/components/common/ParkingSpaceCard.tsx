import { Place } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Stack,
} from "@mui/material";

import { PropertyCardProps } from "../../interfaces/parkingSpace";

const ParkingSpaceCard = ({
                          id,
                          title,
                          location,
                          price,
                          area,
                          photo,
                      }: PropertyCardProps) => {
    return (
        <Card
            component={Link}
            to={`/parking-spaces/show/${id}`}
            sx={{
                maxWidth: "330px",
                padding: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                },
                cursor: "pointer",
                textDecoration: "none",
            }}
            elevation={0}
        >
            <CardMedia
                component="img"
                width="100%"
                height={210}
                image={photo}
                alt="card image"
                sx={{ borderRadius: "10px" }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#002f34" maxWidth="200px">
                        {title}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="flex-start">
                        <Place
                            sx={{
                                fontSize: 18,
                                color: "#002f34",
                                marginTop: 0.5,
                            }}
                        />
                        <Typography fontSize={14} color="#808191" maxWidth="200px">
                            {location}
                        </Typography>
                    </Stack>
                </Stack>
                <Box
                    px={1.5}
                    py={0.5}
                    borderRadius={1}
                    bgcolor="rgba(110,152,155,0.37)"
                    height="fit-content"
                >
                    <Typography fontSize={12} fontWeight={600} color="#002f34">
                        {price} zł
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ParkingSpaceCard
