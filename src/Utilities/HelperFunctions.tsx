import { StateSetter, InputField, PasswordInputField, StateObject } from '../GlobalTypes';
import { InputError } from '../generated/graphql';
import { useEffect, useState } from 'react';
import { useMeQuery, User } from '../generated/graphql';
import { useHistory } from 'react-router-dom';

/**
 * Checks if the state variable used to represent a text/password field is empty. If the field is empty, and if it is mandatory, sets the error 
 * field of the state variable to true
 * @param {T extends InputField} stateVariable 
 * @param {StateSetter<T extends InputField>} stateVariableSetter 
 * @param {Boolean} isMandatory 
 * @returns Whether the field represented by the state variable is empty
 */
export function isFieldEmpty(stateVariable: InputField, stateVariableSetter: StateSetter<InputField | PasswordInputField>, isMandatory=true){
    if(stateVariable.text === '' && isMandatory){
        stateVariableSetter({ ...stateVariable, ['error']: true });
    }

    return stateVariable.text === '';
};

/**
 * Resets the error to false in an object type state variable which has an error field
 * @param {InputField} stateVariable 
 * @param {StateSetter<T extends InputField>} stateVariableSetter 
 */
export function resetError(stateVariable: InputField, stateVariableSetter: StateSetter<InputField | PasswordInputField>){
    stateVariableSetter({ ...stateVariable, ['error']: false, ['helperText']: null});
}

/**
 * Maps the error received from the server to the respective input field
 * @param {InputError[]} errors 
 * @param {Record<string, StateObject<InputField>>} fieldMap 
 */
export function mapErrorToField(errors: InputError[], fieldMap: Record<string, StateObject<InputField>>){
    errors.forEach(error => {
        const { state, setState } = fieldMap[error.fieldName];
        setState({ ...state, ['helperText']: error.description, ['error']: true });
    });
}

/**
 * Checks if the user is logged in and authorized to view the page. Returns the user if they are logged in and null otherwise
 * @returns The current user logged in
 */
export function useAuthorizationCheck(): Pick<User, "username" | "id"> | null{
    const { loading, data } = useMeQuery();
    const [user, setUser] = useState<Pick<User, 'username' | 'id'> | null>(null);
    const history = useHistory();

    useEffect(() => {
        if(!loading && !data?.me){
            history.push(`/?next=${history.location.pathname}`);
        }else if(!loading && data?.me){
            // Means we are not loading and there is a user logged in
            setUser(data?.me);
        }
    }, [loading, data]);

    return user;
    
}