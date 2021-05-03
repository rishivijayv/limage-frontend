
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
        textAlign: 'center',
        margin: '40px'
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
    const [oneSearchSubmitted, setOneSearchSubmitted] = useState(false);
    const [imageList, setImageList] = useState([]);

    const discoverImagesForLabel = () => {

        const imagesForLabel = platformImages.filter(image => image.label.startsWith(labelToDiscover)).map(filteredImage => ({
            id: filteredImage.id,
            img: filteredImage.img,
            displayLabel: `~${filteredImage.label}~`
        }));

        if(!oneSearchSubmitted){
            setOneSearchSubmitted(true);
        }

        setImageList(imagesForLabel);
    };

    const saveImageToLabel = (e, imageId) => {
        e.preventDefault();
        console.log(`Saving image with id ${imageId}`);
    };

    const searchOnEnterKey = (event) => {
        const code = event.keyCode || event.which;

        if(code === 13){
            discoverImagesForLabel();
        }
    };

    return (
        <div>
            <Navigation pathsWithButtons={navButtons} />
            <div className={classes.discoverRoot}>
                <Heading title="Discover" subtitle="Explore images for a label of your choice"/>
                <div className={classes.actionArea}>
                    <TextField size="small" variant="outlined" label="Search for Labels" onChange={(e) => setLabelToDiscover(e.target.value)} onKeyPress={(e) => searchOnEnterKey(e)}/>
                    <Button variant="contained" 
                            className={classes.button} 
                            startIcon={<KeyboardArrowRightIcon />} 
                            component="label" 
                            key="discover-label-button"
                            onClick={() => discoverImagesForLabel()}>
                        Go
                    </Button>
                </div>
                <br />
                {oneSearchSubmitted && imageList.length === 0 ? <h3>Seems like there are no images for this label</h3> : null}
                {imageList.length > 0 ? <Images imageList={imageList} onImageButtonClick={saveImageToLabel} actionIcon={SaveAltIcon}/> : null}
            </div>

        </div>
    );
}

export default Discover;