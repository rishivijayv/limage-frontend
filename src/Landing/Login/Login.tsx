import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import PasswordField, { initPassword } from '../../Utilities/PasswordField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { isFieldEmpty, resetError } from '../../Utilities/HelperFunctions';

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

function Login(){
    const history = useHistory();
    const classes = useStyles();
    const [username, setUsername] = useState({
        text: '',
        error: false
    });
    const [password, setPassword] = useState(initPassword);



    const handleSubmit = () => {
        resetError(username, setUsername);
        resetError(password, setPassword);

        const usernameEmpty = isFieldEmpty(username, setUsername);
        const passwordEmpty = isFieldEmpty(password, setPassword);

        if(!usernameEmpty && !passwordEmpty){
            history.push("/profile/rishivijayv");
        }

    };

   return (
       <div>
            <TextField error={username.error} className={classes.username} label="Username" variant="outlined" value={username.text} onChange={(e) => setUsername({ ...username, ['text']: e.target.value})}/> <br />
            <PasswordField passwordObject={password} passwordSetter={setPassword} labelText="Password" error={password.error}/> <br />
            {username.error || password.error ? <h5 className={classes.errorText}>Username and password cannot be empty</h5> : null}
            <Button className={classes.button} onClick={() => handleSubmit()} variant="contained" component="label">
                Login
            </Button>
       </div>
   );
}

export default Login;