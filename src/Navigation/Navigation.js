import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Banner from './Banner/Banner';
import NavButtons from './NavButtons/NavButtons';
import LabelDiscoverySearch from './LabelDiscoverySearch/LabelDiscoverySearch';


const useStyles = makeStyles((theme) => ({
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

  function Navigation(){
    const classes = useStyles();

    return (
        <div className={classes.navigation}>
            <AppBar position="static">
                <Toolbar className={classes.bar}>
                    <Banner />

                    <div className={classes.navigationGroup}>
                        <LabelDiscoverySearch />
                    </div>  
                    
                    <div className={classes.navigationGroup}>
                        <NavButtons />
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    );
  }

  export default Navigation;