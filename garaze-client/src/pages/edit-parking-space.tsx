import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import Form from "components/common/Form";

const EditParkingSpace = () => {
    const { data: user } = useGetIdentity();
    const [spaceImage, setSpaceImage] = useState({ name: '', url: ''})
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

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
            // @ts-ignore
            email: user.email,
        });
    };

    return (
        <Form
            type="Edytuj"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            spaceImage={spaceImage}
        />
    );
};

export default EditParkingSpace;
