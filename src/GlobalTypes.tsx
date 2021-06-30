// A list of global types likely to be used all over the application

import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import { UserUploadedImagesQuery, SavedImagesQuery, LabelsForUserQuery, DiscoverImagesQuery } from "./generated/graphql";
import { User, Exact, PaginatedInput } from './generated/graphql';

export type StateSetter<Type> = React.Dispatch<React.SetStateAction<Type>>;

export interface InputField {
    text: string,
    error: boolean,
    helperText: string | null
};

export interface PasswordInputField extends InputField {
    show?: boolean
}

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
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disable?: boolean;
}

export type StateObject<T> = {
    state: T,
    setState: StateSetter<T>
};

export type ProtectedComponentProps = {
    user: Pick<User, "username" | "id"> | null
}

export type FetchableEntities = UserUploadedImagesQuery | SavedImagesQuery | LabelsForUserQuery | DiscoverImagesQuery;

export type UpdateQueryOptions = {
    fetchMoreResult?: FetchableEntities | undefined;
    variables?: Exact<{
        paginatedInput: PaginatedInput;
    }> | undefined;
};