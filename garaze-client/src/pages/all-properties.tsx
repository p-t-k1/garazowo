import {useNavigate} from "react-router-dom";
import {Box, Stack, Typography} from "@mui/material";
import { Add } from "@mui/icons-material";

import { CustomButton } from "components";


const AllProperties = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Stack direction="row"
                   justifyContent="space-between"
                   alignItems="center">
                <Typography fontSize={25} fontWeight={700} color={"#002f34"}>Wszystkie dostępne miejsca</Typography>
                <CustomButton title="Dodaj nowe miejsce" handleClick={() => navigate('/parking-spaces/create')} backgroundColor={"#002f34"} color={"#ffffff"} icon={<Add />}/>
            </Stack>
        </Box>
    )
}

export default AllProperties
