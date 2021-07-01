import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import PasswordField, { initPassword } from '../../Utilities/PasswordField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { isFieldEmpty, mapErrorToField, resetError } from '../../Utilities/HelperFunctions';
import { PasswordInputField, InputField, StateObject } from '../../GlobalTypes'; 
import { useSignupMutation, MeQuery, MeDocument } from "../../generated/graphql";


const useStyles = makeStyles((theme: Theme) => ({
    button: theme.custom.button,
    username: {
        margin: theme.spacing(1),
        width: '25ch'
    },
    errorText: {
        color: theme.palette.error.main
    }
}));

function Signup(){
    const classes = useStyles();
    const history = useHistory();
    const [signup, { loading }] = useSignupMutation();
    const [username, setUsername] = useState<InputField>({
        text: '',
        error: false,
        helperText: null
    });
    const [password, setPassword] = useState<PasswordInputField>(initPassword);
    const [confirmPassword, setConfirmPassword]  = useState<PasswordInputField>(initPassword);
    const [signupServerError, setSignupServerError] = useState(false);

    const fieldMap: Record<string, StateObject<InputField>> = {
        "username": { state: username, setState: setUsername },
        "password": { state: password, setState: setPassword },
        "confirmPassword": { state: confirmPassword, setState: setConfirmPassword }
    };

    const resetAllErrors = () => {
        resetError(username, setUsername);
        resetError(password, setPassword);
        resetError(confirmPassword, setConfirmPassword);
    };

    const handleNewUserSubmit = async () => {
    

        const usernameError = isFieldEmpty(username, setUsername) || username.error;
        const passwordError = isFieldEmpty(password, setPassword) || password.error;
        const confirmPasswordError = isFieldEmpty(confirmPassword, setConfirmPassword) || confirmPassword.error;

        if(usernameError || passwordError || confirmPasswordError){
            return;
        }

        resetAllErrors();

        try{
            const response = await signup({
                variables: {
                    username: username.text,
                    password: password.text
                },
                update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            __typename: "Query",
                            me: data?.signup.user
                        }
                    })
                }
            });

            if(response.data?.signup.errors){
                mapErrorToField(response.data.signup.errors, fieldMap);
                return;
            }

            history.push("/profile");
        }catch(e){
            setSignupServerError(true);
        }
        
    };

    const validateUsernameInput = (input: string) => {
        resetError(username, setUsername);
        if(!/^[a-zA-Z0-9]*$/.test(input)){
            setUsername({ ...username, ['error']: true, ['helperText']: "Only numbers and letters are allowed" });
        }
    }

    const checkPasswordsMatch = () => {
        resetError(confirmPassword, setConfirmPassword);
        if(password.text !== confirmPassword.text){
            setConfirmPassword({ ...confirmPassword, ['error']: true, ['helperText']: "The passwords do not match" });
        }
    }

    return (
        <div>
             <TextField error={username.error} className={classes.username} helperText={username.helperText}
                        label="New Username" variant="outlined" 
                        value={username.text} onChange={(e) => setUsername({ ...username, ['text']: e.target.value })}
                        onBlur={(e) => validateUsernameInput(e.target.value)}/> <br />
             <PasswordField error={password.error} passwordObject={password} passwordSetter={setPassword} labelText="Password" /> <br />
             <PasswordField error={confirmPassword.error} passwordObject={confirmPassword} passwordSetter={setConfirmPassword} labelText="Confirm Password" onBlur={() => checkPasswordsMatch()}/> <br />
             {signupServerError ? <h5>Something went wrong. Please try again.</h5> : null}
             <Button disabled={loading} className={classes.button} onClick={() => handleNewUserSubmit()} variant="contained" component="label">
                 {loading ? "Siging up..." : "Sign up"}
             </Button>
        </div>
    );

}

export default Signup;