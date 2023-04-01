import { IResourceComponentsProps } from "@refinedev/core";
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
                    colors={["#23e5db", "#c4e8ef"]}
                />
                <PieChart
                    title="Miejsca do wynajęcia"
                    value={452}
                    series={[60, 40]}
                    colors={["#23e5db", "#c4e8ef"]}
                />
                <PieChart
                    title="Liczba użytkowników"
                    value={5684}
                    series={[75, 25]}
                    colors={["#23e5db", "#c4e8ef"]}
                />
                <PieChart
                    title="Dodane dzisiaj"
                    value={5}
                    series={[75, 25]}
                    colors={["#23e5db", "#c4e8ef"]}
                />
            </Box>

            <Stack mt="25px" width="100%" direction={{ xs: 'column', lg: 'row'}} gap={4}>
                <TotalRevenue />
                <PropertyReferrals />
            </Stack>
        </Box>
    );
};
