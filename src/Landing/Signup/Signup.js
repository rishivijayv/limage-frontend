import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import PasswordField, { initPassword } from '../../Utilities/PasswordField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    const [username, setUsername] = useState({
        text: '',
        error: false
    });
    const [password, setPassword] = useState(initPassword);
    const [confirmPassword, setConfirmPassword]  = useState(initPassword);

    const isFieldEmpty = (field, fieldSetter) => {
        if(field.text === ''){
            fieldSetter({ ...field, ['error']: true });
            return true;
        }

        return false;
    };

    const resetAllErrors = () => {
        setUsername({ ...username, ['error']: false });
        setPassword({ ...password, ['error']: false })
        setConfirmPassword({ ...confirmPassword, ['error']: false })
    };

    const handleNewUserSubmit = () => {
        resetAllErrors();

        const usernameEmpty = isFieldEmpty(username, setUsername);
        const passwordEmpty = isFieldEmpty(password, setPassword);
        const confirmPasswordEmpty = isFieldEmpty(confirmPassword, setConfirmPassword);

        if(!usernameEmpty && !passwordEmpty && !confirmPasswordEmpty){
            history.push("/profile/rishivijayv")
        }
    };

    const errorInForm = username.error || password.error || confirmPassword.error;

    return (
        <div>
             <TextField error={username.error} className={classes.username} label="New Username" variant="outlined" value={username.text} onChange={(e) => setUsername({ ...username, ['text']: e.target.value })}/> <br />
             <PasswordField error={password.error} passwordObject={password} passwordSetter={setPassword} labelText="Password" /> <br />
             <PasswordField error={confirmPassword.error} passwordObject={confirmPassword} passwordSetter={setConfirmPassword} labelText="Confirm Password" /> <br />
             {errorInForm ? <h5 className={classes.errorText}>All fields are mandatory.</h5> : null}
             <Button className={classes.button} onClick={() => handleNewUserSubmit()} variant="container" component="label">
                 Signup
             </Button>
        </div>
    );

}

export default Signup;