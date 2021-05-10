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

type SearchFieldProps = {
    label: string,
    onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
};

function SearchField({ label, onChange }: SearchFieldProps){
    const classes = useStyles();
    return <div className={classes.fieldContainer}>
        <TextField label={label} onChange={onChange} variant="outlined" className={classes.searchField}/>
        </div>
}

export default SearchField;