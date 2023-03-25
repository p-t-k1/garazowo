import { useState } from "react";
import {useGetIdentity, useNavigation} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import Form from "../components/common/Form";

const CreateParkingSpace = () => {
    const navigate = useNavigation();
    const { data: user } = useGetIdentity();
    const [spaceImage, setSpaceImage] = useState({ name: '', url: ''})
    const { refineCore: { onFinish, formLoading}, register, handleSubmit } = useForm();

    const handleImageChange = () => {}
    const onFinishHandler = () => {}

    return (
        <Form
            type="Dodaj"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            spaceImage={spaceImage}
        />
    )
}

export default CreateParkingSpace
