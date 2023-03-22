import ReactApexChart from "react-apexcharts";
import { Box, Typography, Stack } from "@mui/material";
import { ArrowCircleUpRounded } from "@mui/icons-material";

import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

const TotalRevenue = () => {
    return (
        <Box
            p={4}
            flex={1}
            bgcolor="#fcfcfc"
            id="chart"
            display="flex"
            flexDirection="column"
            borderRadius="15px"
            gap={4}
        >
            <Typography fontSize={18} fontWeight={600} color="#002f34">
                Łączny przychód
            </Typography>

            <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
                <Typography fontSize={28} fontWeight={700} color="#002f34">
                    16 540 zł
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                    <ArrowCircleUpRounded
                        sx={{ fontSize: 25, color: "#23e5db" }}
                    />
                    <Stack>
                        <Typography fontSize={15} color="#23e5db">
                            20.1%
                        </Typography>
                        <Typography fontSize={12} color="#808191">
                            Względem poprzedniego roku
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            <ReactApexChart
                series={TotalRevenueSeries}
                type="bar"
                height={310}
                options={TotalRevenueOptions}
            />
        </Box>
    );
};

export default TotalRevenue;
