import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";

import { Profile } from "components";

const UserProfile = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: id as string,
    });

    const myProfile = data?.data ?? [];

    if (isLoading) return <div>Ładowanie...</div>;
    if (isError) return <div>Błąd</div>;

    return (
        <Profile
            type=""
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            parkingSpaces={myProfile.allParkingSpaces}
        />
    );
};

export default UserProfile;
