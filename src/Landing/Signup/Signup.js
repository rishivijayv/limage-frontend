import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import PasswordField, { initPassword, extractPassword } from '../../Utilities/PasswordField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: theme.custom.button,
    username: {
        margin: theme.spacing(1),
        width: '25ch'
    }
}));

function Signup(){
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(initPassword);
    const [confirmPassword, setConfirmPassword]  = useState(initPassword);

    return (
        <div>
             <TextField className={classes.username} label="New Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
             <PasswordField passwordObject={password} passwordSetter={setPassword} labelText="Password" /> <br />
             <PasswordField passwordObject={confirmPassword} passwordSetter={setConfirmPassword} labelText="Confirm Password" /> <br />
             <Button className={classes.button} onClick={() => history.push("/profile/rishivijayv")} variant="container" component="label">
                 Signup
             </Button>
        </div>
    );

}

export default Signup;