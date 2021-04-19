import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    barButton: {
        marginLeft: '10px',
        marginRight: '0px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.20)
        }
    },
}));

function Buttons(){
    const classes = useStyles();

    return (
        <div>
            <IconButton className={classes.barButton} color="inherit">
                <HomeIcon/>
            </IconButton>
            <IconButton className={classes.barButton} color="inherit">
                <SettingsIcon />
            </IconButton>
            <IconButton className={classes.barButton} color="inherit">
                <ExitToAppIcon />
            </IconButton>
        </div>
    );
}

export default Buttons;