import { useState } from 'react';
import PasswordField, { initPassword } from '../../Utilities/PasswordField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: theme.custom.button,
    container: theme.custom.centerContainer,
    username: {
        margin: theme.spacing(1),
        width: '25ch'
    }
}));

function Login(){
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(initPassword);

   return (
       <div className={classes.container}>
            <TextField className={classes.username} label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
            <PasswordField passwordObject={password} passwordSetter={setPassword} labelText="Password" /> <br />
            <Button className={classes.button} variant="container" component="label" onClick={() => console.log("Loggin in")}>
                Login
            </Button>
       </div>
   );
}

export default Login;