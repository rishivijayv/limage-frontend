import { StateSetter, InputField, PasswordInputField, StateObject, FetchableEntities, UpdateQueryOptions } from '../GlobalTypes';
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
            setUser(data?.me);
        }
    }, [loading, data]);

    return user;
    
}

/**
 * Takes a query string from react-router-dom's location.search and returns an object representing the 
 * key and the value.
 * 
 * Prerequisite: The input is a simple, well formed query string, such as: ?varOne=valueOne&varTwo=valTwo
 * @param queryString A string representing the query string
 */
export function parseQueryString(queryString: string): Record<string, string> {
    if(queryString.length === 0){
        return {};
    }
    const queryObject = {};
    const cleanQueryArray = queryString.substring(1).split('&');

    cleanQueryArray.forEach(keyValueString => {
        const [key, value] = keyValueString.split('=');
        queryObject[key] = value;

    });

    return queryObject;
}

export async function fetchMoreEntities(fetchMore: Function, queryName: string, data: FetchableEntities, limit: number, cursor: string | null | undefined): Promise<void> {
    let nextCursor = cursor;
    if(!nextCursor){
        nextCursor = data[queryName].entities[data[queryName].entities.length - 1].createdAt;
    }
    fetchMore({
        variables: {
            paginatedInput: {
                limit,
                cursor: nextCursor
            }
        },
        updateQuery: (prev: FetchableEntities, { fetchMoreResult }: UpdateQueryOptions): FetchableEntities => {
            if(!fetchMoreResult) return prev;

            fetchMoreResult[queryName].entities = [
                ...prev[queryName].entities,
                ...fetchMoreResult[queryName].entities
            ];

            return fetchMoreResult
        },
    });
}