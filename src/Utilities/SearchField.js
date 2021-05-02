import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    searchField: {
        marginTop: '2px',
    },
    fieldContainer: {
        textAlign: 'center'
    }
});

function SearchField({ label, onChange }){
    const classes = useStyles();
    return <div className={classes.fieldContainer}>
        <TextField label={label} onChange={onChange} variant="outlined" className={classes.searchField}/>
        </div>
}

export default SearchField;