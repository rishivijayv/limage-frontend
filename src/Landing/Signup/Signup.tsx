// import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import PasswordField, { initPassword } from '../../Utilities/PasswordField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { gql, useMutation } from "@apollo/client";
import { isFieldEmpty, resetError } from '../../Utilities/HelperFunctions';
import { PasswordInputField } from '../../GlobalTypes'; 

const SIGN_UP = gql`
    mutation Signup($username: String!, $password: String!){
        signup(credentials:{username: $username, password: $password}){
            user{
                id,
                username,
                createdAt
            },
            errors{
                fieldName
                description
            }
        }
    }
`;

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
    // const history = useHistory();
    const [signup] = useMutation(SIGN_UP);
    const [username, setUsername] = useState({
        text: '',
        error: false
    });
    const [password, setPassword] = useState<PasswordInputField>(initPassword);
    const [confirmPassword, setConfirmPassword]  = useState<PasswordInputField>(initPassword);

    const resetAllErrors = () => {
        resetError(username, setUsername);
        resetError(password, setPassword);
        resetError(confirmPassword, setConfirmPassword);
    };

    const handleNewUserSubmit = async () => {
        
        resetAllErrors();

        const usernameEmpty = isFieldEmpty(username, setUsername);
        const passwordEmpty = isFieldEmpty(password, setPassword);
        const confirmPasswordEmpty = isFieldEmpty(confirmPassword, setConfirmPassword);

        if(usernameEmpty || passwordEmpty || confirmPasswordEmpty){
            return;
        }

        let signupResponse;
        try{
            signupResponse = await signup({
                variables: {
                    username: username.text,
                    password: password.text
                }
            });
        }catch(e){
            console.log(e)
        }
        

        console.log("Signed up successfully");
    };

    const errorInForm = username.error || password.error || confirmPassword.error;

    return (
        <div>
             <TextField error={username.error} className={classes.username} label="New Username" variant="outlined" value={username.text} onChange={(e) => setUsername({ ...username, ['text']: e.target.value })}/> <br />
             <PasswordField error={password.error} passwordObject={password} passwordSetter={setPassword} labelText="Password" /> <br />
             <PasswordField error={confirmPassword.error} passwordObject={confirmPassword} passwordSetter={setConfirmPassword} labelText="Confirm Password" /> <br />
             {errorInForm ? <h5 className={classes.errorText}>All fields are mandatory.</h5> : null}
             <Button className={classes.button} onClick={() => handleNewUserSubmit()} variant="contained" component="label">
                 Signup
             </Button>
        </div>
    );

}

export default Signup;