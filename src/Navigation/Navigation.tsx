import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Banner from './Banner/Banner';
import NavButtons from './NavButtons/NavButtons';
import { NavButton } from '../GlobalTypes';


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

  type NavigationProps = {
      pathsWithButtons: NavButton[]
  }

  function Navigation({ pathsWithButtons }: NavigationProps){
    const classes = useStyles();

    return (
        <div className={classes.navigation}>
            <AppBar position="static">
                <Toolbar className={classes.bar}>
                    <Banner />
                    <div className={classes.navigationGroup}>
                        <NavButtons pathsWithButtons={pathsWithButtons}/>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
  }

  export default Navigation;