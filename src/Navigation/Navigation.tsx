import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Banner from './Banner/Banner';
import NavButtons from './NavButtons/NavButtons';
import { NavButton } from '../GlobalTypes';
import { useMeQuery } from '../generated/graphql';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme: Theme) => ({
    navigation: {
        minWidth: '560px'
    },
    bar: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    navigationGroup: {
        marginLeft: 'auto'
    },
  }));

  const unauthenticatedNavButtons: NavButton[] = [
    {
      path: '/',
      display: "Login"
    }, 
    {
      path: '/signup',
      display: "Signup"
    }
  ]
  
  const authenticatedNavButtons: NavButton[] = [
    { 
        path: '/profile', 
        display: HomeIcon 
    },
    { 
        path: '/discover', 
        display: SearchIcon 
    },
    { 
        path: '/settings', 
        display: SettingsIcon 
    },
    { 
        path: '/', 
        display: ExitToAppIcon 
    }
  ]

  function Navigation(){
    const classes = useStyles();
    const { data, loading } = useMeQuery();

    let navButtons: NavButton[] = [];

    if(loading){
        console.log('loading the nav bar');
    }else if(data){
        if(data.me !== null){
            navButtons = authenticatedNavButtons;
        }else{
            navButtons = unauthenticatedNavButtons;
        }
    }

    return (
        <div className={classes.navigation}>
            <AppBar position="static">
                <Toolbar className={classes.bar}>
                    <Banner />
                    <div className={classes.navigationGroup}>
                        <NavButtons pathsWithButtons={navButtons}/>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
  }

  export default Navigation;