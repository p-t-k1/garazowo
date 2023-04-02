import {useNavigate} from "react-router-dom";
import {Box, Stack, TextField, Select, MenuItem, Typography} from "@mui/material";
import { Add } from "@mui/icons-material";

import { CustomButton } from "components";
import {useTable} from "@refinedev/core";
import ParkingSpaceCard from "../components/common/ParkingSpaceCard";
import {useMemo} from "react";


const AllParkingSpaces = () => {
    const navigate = useNavigate();

    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorters, setSorters,
        filters, setFilters,
    } = useTable();

    const allParkingSpaces = data?.data ?? [];

    const currentPrice = sorters.find((item) => item.field === 'price')?.order;

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) => ('field' in item ? item : []));

        return {
            title: logicalFilters.find((item) => item.field === 'title')?.value || '',
            parkingSpaceType: logicalFilters.find((item) => item.field === 'parkingSpaceType')?.value || '',
        }
    }, [filters])

    const toggleSort = (field: string) => {
        setSorters([{ field, order: currentPrice === 'asc' ? 'desc' : 'asc'}])
    }

    if (isLoading) return <Typography>Ładowanie...</Typography>;
    if (isError) return <Typography>Błąd...</Typography>;

    return (
        <Box>
            <Box mt="10px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3}}>
                <Stack direction="column" width="100%">
                    <Typography fontSize={25} fontWeight={700} color={"#002f34"}>{!allParkingSpaces.length ? 'Brak dostępnych ogłoszeń' : 'Wszystkie dostępne miejsca'}</Typography>
                    <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap">
                        <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: '20px', sm: 0}}>
                            <CustomButton title={`Sortuj po cenie ${currentPrice === 'asc' ? '↑' : '↓'}`} handleClick={() => toggleSort('price')} backgroundColor={"#002f34"} color={"#fcfcfc"} />
                            <TextField variant="outlined" color="info" placeholder="Szukaj po nazwie" value={currentFilterValues.title} onChange={(e) => setFilters([{ field: 'title', operator: 'contains', value: e.currentTarget.value ? e.currentTarget.value : undefined}])}/>
                            <Select variant="outlined" color="info" displayEmpty required inputProps={{ 'aria-label': 'Without label' }} defaultValue="" value={currentFilterValues.parkingSpaceType} onChange={(e) => setFilters([{ field: 'parkingSpaceType', operator: 'eq', value: e.target.value}], 'replace')}>
                                <MenuItem value="">Wszystkie</MenuItem>
                                {['Miejsce postojowe w hali garażowej', 'Miejsce postojowe w garażu podziemnym', 'Miejsce postojowe w garażu', 'Miejsce postojowe naziemne', 'Garaż indywidualny na wynajem', 'Inne'].map((type) => (
                                    <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </Stack>
            </Box>

            <Stack direction="row"
                   justifyContent="space-between"
                   alignItems="center">
                <CustomButton title="Dodaj nowe miejsce" handleClick={() => navigate('/parking-spaces/create')} backgroundColor={"#002f34"} color={"#ffffff"} icon={<Add />}/>
            </Stack>

            <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3}}>
                {allParkingSpaces.map((parkingSpace) => (
                    <ParkingSpaceCard
                        key={parkingSpace._id}
                        id={parkingSpace._id}
                        title={parkingSpace.title}
                        price={parkingSpace.price}
                        area={parkingSpace.area}
                        location={parkingSpace.location}
                        photo={parkingSpace.photo}
                    />
                ))}
            </Box>

            {allParkingSpaces.length > 0 && (
                <Box display="flex" gap={2} mt={3} flexWrap="wrap">
                    <CustomButton title="Poprzednia" handleClick={() => setCurrent((prev) => prev - 1)} backgroundColor="#002f34" color="#fcfcfc" disabled={!(current > 1)} />
                    <Box display={{ xs: 'hidden', sm: 'flex'}} alignItems="center" gap="5px">
                        Strona{' '}<strong>{current} / {pageCount}</strong>
                    </Box>
                    <CustomButton title="Następna" handleClick={() => setCurrent((prev) => prev + 1)} backgroundColor="#002f34" color="#fcfcfc" disabled={current === pageCount} />
                    <Select variant="outlined" color="info" displayEmpty required inputProps={{ 'aria-label': 'Without label' }} defaultValue={10} onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)} >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <MenuItem key={size} value={size}>Pokaż {size}</MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
        </Box>
    )
}

export default AllParkingSpaces
