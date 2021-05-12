import { StateSetter, UserInputField } from '../GlobalTypes';


/**
 * Checks if the state variable used to represent a text/password field is empty. If the field is empty, and if it is mandatory, sets the error 
 * field of the state variable to true
 * @param {UserInputField} stateVariable 
 * @param {StateSetter<UserInputField>} stateVariableSetter 
 * @param {Boolean} isMandatory 
 * @returns Whether the field represented by the state variable is empty
 */
export function isFieldEmpty(stateVariable: UserInputField, stateVariableSetter: StateSetter<UserInputField>, isMandatory=true){
    if(stateVariable.text === '' && isMandatory){
        stateVariableSetter({ ...stateVariable, ['error']: true });
    }

    return stateVariable.text === '';
};

/**
 * Resets the error to false in an object type state variable which has an error field
 * @param {UserInputField} stateVariable 
 * @param {StateSetter<UserInputField>} stateVariableSetter 
 */
export function resetError(stateVariable: UserInputField, stateVariableSetter: StateSetter<UserInputField>){
    stateVariableSetter({ ...stateVariable, ['error']: false});
}