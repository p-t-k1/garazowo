import { useState } from "react";
import {useGetIdentity, useNavigation} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import Form from "../components/common/Form";

import { FieldValues } from "react-hook-form";

const CreateParkingSpace = () => {
    const navigate = useNavigation();
    const { data: user } = useGetIdentity();
    const [spaceImage, setSpaceImage] = useState({ name: '', url: ''})
    const { refineCore: { onFinish, formLoading}, register, handleSubmit } = useForm();

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setSpaceImage({ name: file?.name, url: result }),
        );
    };

    const onFinishHandler = async (data: FieldValues) => {
        if (!spaceImage.name) return alert("Błąd, wybierz zdjęcie");

        await onFinish({
            ...data,
            photo: spaceImage.url,
            email: user.email,
        });
    };
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
