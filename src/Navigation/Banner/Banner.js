import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    heading: {
        fontWeight: '900'
    }
});


function Banner(){
    const classes = useStyles();

    return (
        <Typography className={classes.heading} variant="h6" noWrap>
            Limage
        </Typography>
    );
}

export default Banner;