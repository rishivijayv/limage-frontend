import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Banner from './Banner/Banner';
import NavButtons from './NavButtons/NavButtons';
import { NavButton } from '../GlobalTypes';
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useApolloClient } from '@apollo/client';


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
    }
  ]

  function Navigation(){
    const classes = useStyles();
    const { data, loading } = useMeQuery();
    const [logout, { loading: logoutLoading }] = useLogoutMutation();
    const client = useApolloClient();

    // Manually adding logout button to customize onClick functionality
    if(authenticatedNavButtons.find(button => button.path === '/') === undefined){
        authenticatedNavButtons.push({
            path: '/',
            display: ExitToAppIcon,
            onClick: async () => {
                await logout();
                await client.clearStore();
            },
            disable: logoutLoading
        });
    }


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