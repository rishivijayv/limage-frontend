// A list of global types likely to be used all over the application

import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";

export type StateSetter<Type> = React.Dispatch<React.SetStateAction<Type>>;

export type UserInputField = {
    show?: boolean,
    text: string,
    error: boolean
};
export type Image = {
    id: number,
    img: string,
    displayLabel: string
}

export type HeadingLink =  {
    url: string;
    display: string;
}

export type Nullable<T> = T | null;

export type Undefineable<T> = T | undefined;

export type NavButton = {
    path: string;
    display: OverridableComponent<SvgIconTypeMap<{}, "svg">> | string;
}