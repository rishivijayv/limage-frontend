
import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Images from '../Utilities/Images';
import Heading from '../Utilities/Heading';
import TextField from '@material-ui/core/TextField';
import { platformImages } from '../TempData/TempData';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { NavButton, Image } from '../GlobalTypes';

const useStyles = makeStyles((theme: Theme) => ({
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

type DiscoverProps = {
    navButtons: NavButton[]
};

function Discover({ navButtons }: DiscoverProps){
    const classes = useStyles();
    const [labelToDiscover, setLabelToDiscover] = useState("");
    const [oneSearchSubmitted, setOneSearchSubmitted] = useState(false);
    const [imageList, setImageList] = useState<Image[]>([]);

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

    const timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    const saveImageToLabel = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageId: number): Promise<void> => {
        e.preventDefault();
        await timeout(2000);
        console.log("Saved Image");
    };

    const searchOnEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
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