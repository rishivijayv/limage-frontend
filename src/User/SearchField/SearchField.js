import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    searchField: {
        marginBottom: '10px'
    },
});

function SearchField({ label, onChange }){
    const classes = useStyles();
    return <TextField label={label} onChange={onChange} variant="outlined" className={classes.searchField}/>
}

export default SearchField;