import { 
    useRouteMatch, 
    useHistory 
} from 'react-router-dom';
import { useState } from 'react';
import { labels } from '../../TempData/TempData';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import SearchField from '../../Utilities/SearchField';

const useStyles = makeStyles((theme: Theme) => ({
    labelCard: {
        minWidth: '400px',
        minHeight: '340px',
        border: '1px solid black'
    },
    centerContent: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    breadcrumb: {
        marginBottom: '5px',
        '& a': theme.custom.basicLink
    }
}));


function Labels(){
    const match = useRouteMatch();
    const history = useHistory();
    const classes = useStyles();
    const [toSearch, setToSearch] = useState("");

    const navigateToLabel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const element = event.target as HTMLElement;
        const labelText = element.innerText;
        const labelName = labelText.substring(1, labelText.length - 1);
        history.push(`${match.url}/${labelName}`);
    };

    return (
        <div>
            <SearchField label="Search for Label" onChange={(e) => setToSearch(e.target.value)}/>
            <br />
            <GridList cellHeight={350} cols={3}>
                {labels
                .filter(label => label.startsWith(toSearch))
                .map((label) => {
                    return <GridListTile>
                        <Card variant="outlined" className={classes.labelCard}>
                            <CardActionArea onClick={(e) => navigateToLabel(e)} className={classes.centerContent}>
                                <CardContent className={classes.centerContent}>
                                    <Typography variant="h2">
                                        ~{label}~
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    </GridListTile>
                })}
            </GridList>
        </div>
        
    );
}

export default Labels;