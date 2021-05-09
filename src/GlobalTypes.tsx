// A list of global types likely to be used all over the application

export type StateSetter<Type> = React.Dispatch<React.SetStateAction<Type>>;

export type UserInputField = {
    show?: boolean,
    text: string,
    error?: boolean
};
