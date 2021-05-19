import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { fade, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { NavButton } from '../../GlobalTypes';

const useStyles = makeStyles((theme: Theme) => ({
    barButton: {
        marginLeft: '10px',
        marginRight: '0px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.20)
        }
    },
}));

type NavButtonsProps = {
    pathsWithButtons: NavButton[]
}

function NavButtons({ pathsWithButtons }: NavButtonsProps){
    const classes = useStyles();
    const history = useHistory();

    const buttonsToRender = pathsWithButtons.map((buttonInfo: NavButton) => {
        const DisplayButton = buttonInfo.display
        const buttonType = typeof buttonInfo.display
        let onClick = undefined;

        if(buttonInfo.onClick){
            const customOnClick = buttonInfo.onClick;
            onClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                await customOnClick(event);
                history.push(buttonInfo.path);
            }
        }else {
            onClick = () => history.push(buttonInfo.path);
        }

        if(buttonType === 'string'){
            return (
                <Button onClick={onClick} className={classes.barButton} color="inherit">
                    {DisplayButton}
                </Button>
            );
        }else{
            return (
                <IconButton onClick={onClick} className={classes.barButton} color="inherit">
                    <DisplayButton />
                </IconButton>
            );
        }
    });

    return (
        <div>
            {buttonsToRender}
        </div>
    );
}

export default NavButtons;