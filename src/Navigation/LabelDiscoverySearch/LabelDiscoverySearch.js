import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    search: theme.custom.search,
    searchIcon: theme.custom.searchIcon,
    inputRoot: theme.custom.inputRoot,
    inputInput: theme.custom.inputInput,
}));


function LabelDiscoverySearch(){
    const classes = useStyles();
    
    return (
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
    );
}

export default LabelDiscoverySearch;