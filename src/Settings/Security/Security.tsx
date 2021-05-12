
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import PasswordField, { initPassword } from '../../Utilities/PasswordField';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { UserInputField } from '../../GlobalTypes';
import { resetError, isFieldEmpty } from '../../Utilities/HelperFunctions';


const useStyles = makeStyles((theme: Theme) => ({
    button: theme.custom.button,
    container: theme.custom.centerContainer,
}));


function Security(){
    const classes = useStyles();

    const [oldPassword, setOldPassword] = useState<UserInputField>(initPassword);
    const [newPassword, setNewPassword] = useState<UserInputField>(initPassword);
    const [confirmPassword, setConfirmPassword] = useState<UserInputField>(initPassword);

    const handleChangeRequest = () => {
        resetError(oldPassword, setOldPassword);
        resetError(newPassword, setNewPassword);
        resetError(confirmPassword, setConfirmPassword);

        const oldPasswordEmpty = isFieldEmpty(oldPassword, setOldPassword);
        const newPasswordEmpty = isFieldEmpty(newPassword, setNewPassword);
        const confirmPasswordEmpty = isFieldEmpty(confirmPassword, setConfirmPassword);

        if(!oldPasswordEmpty && !newPasswordEmpty && !confirmPasswordEmpty){
            console.log("Changing Password");
        }

    };

    return (
        <div className={classes.container}>
            <h3>Change Password</h3>
            <PasswordField passwordObject={oldPassword} passwordSetter={setOldPassword} labelText="Old Password" error={oldPassword.error}/> <br />
            <PasswordField passwordObject={newPassword} passwordSetter={setNewPassword} labelText="New Password" error={newPassword.error}/> <br />
            <PasswordField passwordObject={confirmPassword} passwordSetter={setConfirmPassword} labelText="Confirm Password" error={confirmPassword.error}/> <br /> <br />
            <Button className={classes.button} variant="contained" component="label" onClick={() => handleChangeRequest()}>
                Change
            </Button>
        </div>
    );
}

export default Security;