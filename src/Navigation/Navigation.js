import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    navigation: {
        minWidth: '560px'
    },
    bar: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    barButton: {
        marginLeft: '10px',
        marginRight: '0px',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.20)
        }
    },
    buttons: {
        marginLeft: 'auto'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '20ch',
          '&:focus': {
            width: '30ch',
          },
        },
      },
  }));

  function Navigation(){
    const classes = useStyles();

    return (
        <div className={classes.navigation}>
            <AppBar position="static">
                <Toolbar className={classes.bar}>
                    <Typography variant="h6" noWrap>
                    LIMAGE
                    </Typography>

                    <div className={classes.buttons}>
                        <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                <SearchIcon />
                                </div>
                                <InputBase
                                placeholder="Search for Labels"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                />
                        </div>
                    </div>  
                    
                    <div className={classes.button}>
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

                </Toolbar>
            </AppBar>
        </div>
    );
  }

  export default Navigation;