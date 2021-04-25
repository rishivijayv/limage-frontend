import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    search: theme.custom.search,
    searchIcon: theme.custom.searchIcon,
    inputRoot: theme.custom.inputRoot,
    inputInput: theme.custom.inputInput,
}));


function LabelDiscoverySearch(){
    const classes = useStyles();
    const [search, setSearch] = useState("");
    
    return (
        <div className={classes.search}>
            <InputBase
            placeholder="Search for Labels"
            onChange={(e) => setSearch(e.target.value)}
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton onClick={() => console.log(search)}>
                <SearchIcon className={classes.searchIcon}/>
            </IconButton>
        </div>
    );
}

export default LabelDiscoverySearch;