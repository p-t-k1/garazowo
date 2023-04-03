import { useGetIdentity, useOne } from "@refinedev/core";

import { Profile } from "components";

const MyProfile = () => {
    // @ts-ignore
    const userId = JSON.parse(localStorage.getItem('user')).userid;
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: userId,
    });

    const myProfile = data?.data ?? [];

    if (isLoading) return <div>Ładowanie...</div>;
    if (isError) return <div>Błąd</div>;

    return (
        <Profile
            type="Mój"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            parkingSpaces={myProfile.allParkingSpaces}
        />
    );
};

export default MyProfile;
