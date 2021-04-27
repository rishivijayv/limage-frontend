import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    barButton: {
        marginLeft: '10px',
        marginRight: '0px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.20)
        }
    },
}));

function NavButtons({ pathsWithButtons }){
    const classes = useStyles();
    const history = useHistory();

    const buttonsToRender = pathsWithButtons.map(buttonInfo => {
        const DisplayButton = buttonInfo.display
        const buttonType = typeof buttonInfo.display
        const MuiButtonType = buttonType === "string" ? Button : IconButton;
        return (
            <MuiButtonType onClick={() => history.push(buttonInfo.path)} className={classes.barButton} color="inherit">
                {buttonType === "string" ? DisplayButton : <DisplayButton />}
            </MuiButtonType>
        );
    });

    return (
        <div>
            {/* <IconButton onClick={() => history.push(paths.home)} className={classes.barButton} color="inherit">
                <HomeIcon/>
            </IconButton>
            <IconButton onClick={() => history.push(paths.discover)} className={classes.barButton} color="inherit">
                <SearchIcon />
            </IconButton>
            <IconButton onClick={() => history.push(paths.settings)} className={classes.barButton} color="inherit">
                <SettingsIcon />
            </IconButton>
            <IconButton className={classes.barButton} color="inherit">
                <ExitToAppIcon />
            </IconButton> */}
            {buttonsToRender}
        </div>
    );
}

export default NavButtons;