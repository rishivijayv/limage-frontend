import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import PasswordField, { initPassword } from '../../Utilities/PasswordField';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { isFieldEmpty, resetError, mapErrorToField, parseQueryString } from '../../Utilities/HelperFunctions';
import { PasswordInputField, InputField, StateObject } from '../../GlobalTypes';
import { useLoginMutation, MeDocument, MeQuery } from '../../generated/graphql';



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
    const location = useLocation();
    const classes = useStyles();
    const [login, { loading }] = useLoginMutation();
    const [username, setUsername] = useState<InputField>({
        text: '',
        error: false,
        helperText: null
    });
    const [password, setPassword] = useState<PasswordInputField>(initPassword);
    const [loginServerError, setLoginServerError] = useState(false);

    const fieldMap: Record<string, StateObject<InputField>> = {
        "username": { state: username, setState: setUsername },
        "password": { state: password, setState: setPassword }
    };

    
    const parsedParams = parseQueryString(location.search);
    let nextPrompt = null;

    if("next" in parsedParams){
        nextPrompt = <h3>Please login to continue.</h3>
    }   


    const handleSubmit = async () => {
        resetError(username, setUsername);
        resetError(password, setPassword);

        const usernameEmpty = isFieldEmpty(username, setUsername);
        const passwordEmpty = isFieldEmpty(password, setPassword);

        if(usernameEmpty || passwordEmpty){
            return;
        }

        try {
            const response = await login({
                variables: {
                    username: username.text,
                    password: password.text
                },
                update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            __typename: "Query",
                            me: data?.login.user
                        }
                    })
                }
            });
            
            if(response.data?.login.errors){
                mapErrorToField(response.data.login.errors, fieldMap);
                return;
            }

            if("next" in parsedParams){
                history.push(parsedParams["next"]);
            }else{
                history.push("/profile");    
            }
            

        }catch(e) {
            setLoginServerError(true);
        }


    };

   return (
       <div>
            <TextField error={username.error} helperText={username.helperText} className={classes.username} label="Username" variant="outlined" value={username.text} onChange={(e) => setUsername({ ...username, ['text']: e.target.value})}/> <br />
            <PasswordField passwordObject={password} passwordSetter={setPassword} labelText="Password" error={password.error}/> <br />
            { loginServerError ? <h5>Something went wrong. Please try again.</h5> : null } 
            <Button disabled={loading} className={classes.button} onClick={() => handleSubmit()} variant="contained" component="label">
                { loading ? "Logging in..." : "Login" }
            </Button>
            {nextPrompt}
       </div>
   );
}

export default Login;