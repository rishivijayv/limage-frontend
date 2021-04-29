
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import PasswordField from '../../Utilities/PasswordField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    button: theme.custom.button,
    container: theme.custom.centerContainer,
    passwordContainer: {
        margin: theme.spacing(1),
        width: '25ch'
    },
    password: {
        marginBottom: '10px',
        width: '300px'
    },
}));

const initPassword = {
    show: false,
    text: ''
};

function Security(){
    const classes = useStyles();

    const [oldPassword, setOldPassword] = useState(initPassword);
    const [newPassword, setNewPassword] = useState(initPassword);
    const [confirmPassword, setConfirmPassword] = useState(initPassword);

    // const handlePasswordChange = (event, passwordObject, passwordSetter) => {
    //     passwordSetter({ ...passwordObject, ['text']:  event.target.value });
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // }; 

    // const handleClickShowPassword = (passwordObject, passwordSetter) => {
    //     const toggleShow = !passwordObject.show
    //     passwordSetter({ ...passwordObject, ['show']: toggleShow });
    // };

    // const getPasswordField = (passwordObject, passwordSetter, labelText) => {
    //     const labelWidth = labelText.length * 8.6
    //     return (
    //         <FormControl className={classes.passwordContainer} variant="outlined">
    //             <InputLabel htmlFor="outlined-adornment-password">{labelText}</InputLabel>
    //             <OutlinedInput
    //             id="outlined-adornment-password"
    //             type={passwordObject.show ? 'text' : 'password'}
    //             value={passwordObject.text}
    //             onChange={(e) => handlePasswordChange(e, passwordObject, passwordSetter)}
    //             endAdornment={
    //                 <InputAdornment position="end">
    //                 <IconButton
    //                     aria-label="toggle password visibility"
    //                     onClick={() => handleClickShowPassword(passwordObject, passwordSetter)}
    //                     onMouseDown={(e) => handleMouseDownPassword(e)}
    //                     edge="end"
    //                 >
    //                     {passwordObject.show ? <Visibility /> : <VisibilityOff />}
    //                 </IconButton>
    //                 </InputAdornment>
    //             }
    //             labelWidth={labelWidth}
    //             />
    //         </FormControl>
    //     );
    // };

    return (
        <div className={classes.container}>
            <h3>Change Password</h3>
            <PasswordField passwordObject={oldPassword} passwordSetter={setOldPassword} labelText="Old Password" /> <br />
            <PasswordField passwordObject={newPassword} passwordSetter={setNewPassword} labelText="New Password" /> <br />
            <PasswordField passwordObject={confirmPassword} passwordSetter={setConfirmPassword} labelText="Confirm Password" /> <br /> <br />
            <Button className={classes.button} variant="container" component="label" onClick={() => console.log(`Old password was ${oldPassword.text}. New password was ${newPassword.text}. Confirm password was ${confirmPassword.text}`)}>
                Change
            </Button>
        </div>
    );
}

export default Security;