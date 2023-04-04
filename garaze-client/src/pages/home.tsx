import {IResourceComponentsProps, useList} from "@refinedev/core";
import React from "react";

import {
    PieChart,
    PropertyReferrals,
    TotalRevenue,
    ParkingSpaceCard,
    TopAgent
} from '../components'
import {Box, Typography, Stack} from "@mui/material";

export const Home: React.FC<IResourceComponentsProps> = () => {

    const { data, isLoading, isError } = useList({
        resource: "parking-spaces",
        config: {
            pagination: {
                pageSize: 4,
            },
        },
    });

    const latestAddedParkingSpaces = data?.data ?? [];

    if (isLoading) return <Typography>Ładowanie...</Typography>;
    if (isError) return <Typography>Błąd</Typography>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color={"#002f34"}>
                Panel
            </Typography>

            <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
                <PieChart
                    title="Miejsca na sprzedaż"
                    value={74}
                    series={[75, 25]}
                    colors={["#41b6c2", "#c4e8ef"]}
                />
                <PieChart
                    title="Miejsca do wynajęcia"
                    value={452}
                    series={[60, 40]}
                    colors={["#41b6c2", "#c4e8ef"]}
                />
                <PieChart
                    title="Liczba użytkowników"
                    value={5684}
                    series={[75, 25]}
                    colors={["#41b6c2", "#c4e8ef"]}
                />
                <PieChart
                    title="Dodane dzisiaj"
                    value={5}
                    series={[75, 25]}
                    colors={["#41b6c2", "#c4e8ef"]}
                />
            </Box>

            <Stack mt="25px" width="100%" direction={{ xs: 'column', lg: 'row'}} gap={4}>
                <TotalRevenue />
                <PropertyReferrals />
            </Stack>

            <Box
                flex={1}
                borderRadius="15px"
                padding="20px"
                bgcolor="#fcfcfc"
                display="flex"
                flexDirection="column"
                minWidth="100%"
                mt="25px"
            >
                <Typography fontSize="18px" fontWeight={600} color="#002f34">
                    Ostatnie ogłoszenia
                </Typography>

                <Box
                    mt={2.5}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                    {latestAddedParkingSpaces.map((parkingSpace) => (
                        <ParkingSpaceCard
                            key={parkingSpace._id}
                            id={parkingSpace._id}
                            title={parkingSpace.title}
                            location={parkingSpace.location}
                            price={parkingSpace.price}
                            area={parkingSpace.area}
                            photo={parkingSpace.photo}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
