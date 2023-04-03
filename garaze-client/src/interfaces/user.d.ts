import { BaseKey } from "@refinedev/core";

export interface UserCardProp {
    id?: BaseKey | undefined;
    name: string;
    email: string;
    avatar: string;
    noOfProperties: number;
}

export interface InfoBarProps {
    icon: ReactNode;
    name: string;
}
