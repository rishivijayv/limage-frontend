import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    passwordContainer: {
        margin: theme.spacing(1),
        width: '25ch'
    },
    errorIcon: {
        color: theme.palette.error.main
    }
}))

function PasswordField({ passwordObject, passwordSetter, labelText, error }){
    const classes = useStyles();

    const handlePasswordChange = (event, passwordObject, passwordSetter) => {
        passwordSetter({ ...passwordObject, ['text']:  event.target.value });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }; 

    const handleClickShowPassword = (passwordObject, passwordSetter) => {
        const toggleShow = !passwordObject.show
        passwordSetter({ ...passwordObject, ['show']: toggleShow });
    };

    const labelWidth = labelText.length * 8.6
    return (
        <FormControl error={error} className={classes.passwordContainer} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{labelText}</InputLabel>
            <OutlinedInput
            id="outlined-adornment-password"
            type={passwordObject.show ? 'text' : 'password'}
            value={passwordObject.text}
            onChange={(e) => handlePasswordChange(e, passwordObject, passwordSetter)}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    className={error ? `${classes.errorIcon}` : ""}
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword(passwordObject, passwordSetter)}
                    onMouseDown={(e) => handleMouseDownPassword(e)}
                    edge="end"
                >
                    {passwordObject.show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                </InputAdornment>
            }
            labelWidth={labelWidth}
            />
        </FormControl>
    );
}

export const initPassword = {
    show: false,
    text: '',
    error: false
};

export const extractPassword = (passwordObject) => passwordObject.text;

export default PasswordField;