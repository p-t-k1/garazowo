import { useList } from "@refinedev/core";
import { Box, Typography } from "@mui/material";

import { UserCard } from "components";

const Users = () => {
    const { data, isLoading, isError } = useList({ resource: "users" });

    const allUsers = data?.data ?? [];

    if (isLoading) return <div>Ładowanie...</div>;
    if (isError) return <div>Błąd</div>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#002f34">
                Wszyscy użytkownicy
            </Typography>

            <Box
                mt="20px"
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                }}
            >
                {allUsers.map((agent) => (
                    <UserCard
                        key={agent._id}
                        id={agent._id}
                        name={agent.name}
                        email={agent.email}
                        avatar={agent.avatar}
                        noOfProperties={agent.allParkingSpaces.length}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Users;
