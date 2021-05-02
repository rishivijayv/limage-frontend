
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Images from '../Utilities/Images';
import Heading from '../Utilities/Heading';
import TextField from '@material-ui/core/TextField';
import { platformImages } from '../TempData/TempData';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    discoverRoot: {
        textAlign: 'center'
    },
    actionArea: {
        marginTop: '15px'
    },
    button: {
        ...theme.custom.button,
        marginLeft: '10px'
    },

}));


function Discover({ navButtons }){
    const classes = useStyles();
    const [labelToDiscover, setLabelToDiscover] = useState("");

    return (
        <div className={classes.discoverRoot}>
            <Navigation pathsWithButtons={navButtons} />
            <Heading title="Discover" />
            <div className={classes.actionArea}>
                <TextField size="small" variant="outlined" label="Search for Labels" onChange={(e) => setLabelToDiscover(e.target.value)}/>
                <Button variant="contained" 
                        className={classes.button} 
                        startIcon={<KeyboardArrowRightIcon />} 
                        component="label" 
                        key="discover-label-button"
                        onClick={() => console.log(`Discovering ${labelToDiscover}`)}>
                    Go
                </Button>
            </div>

        </div>
    );
}

export default Discover;