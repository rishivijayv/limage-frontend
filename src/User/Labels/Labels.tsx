import { 
    useRouteMatch, 
    useHistory,
} from 'react-router-dom';
import { useState } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import SearchField from '../../Utilities/SearchField';
import { useLabelsForUserQuery, UserLabel } from "../../generated/graphql";
import { fetchMoreEntities } from "../../Utilities/HelperFunctions";

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
    },
    loadMoreContainer: {
        textAlign: 'center',
        marginTop: '20px'
    },
    button: theme.custom.button,
    emptyDiv: theme.custom.centerContainer,
}));


function Labels(){
    const match = useRouteMatch();
    const history = useHistory();
    const classes = useStyles();
    const [toSearch, setToSearch] = useState("");
    const { loading, data, error, fetchMore } = useLabelsForUserQuery({
        variables: {
            paginatedInput: {
                limit: 3,
                cursor: null
            }
        }
    });

    let labels: UserLabel[] = [];

    if(loading && !data){
        return <></>
    }else if(error) {
        return <h3>Something went wrong. Please try again later</h3>
    }else if(data) {
        labels = data.labelsForUser.entities.filter(label => label.labelName.startsWith(toSearch))
        console.log(labels);
    }

    const navigateToLabel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const element = event.target as HTMLElement;
        const labelText = element.innerText;
        const labelName = labelText.substring(1, labelText.length - 1);
        const labelId = labels.find(label => label.labelName === labelName)!.id
        history.push(`${match.url}/${labelId.toString()}`);
    };


    return (
        <div>
            {data && data.labelsForUser.entities.length > 0 ? <SearchField label="Search for Label" onChange={(e) => setToSearch(e.target.value)}/> : null}
            <br />
            {labels.length > 0 ? 
            <GridList cellHeight={350} cols={3}>
                {labels
                .map((label) => {
                    return <GridListTile>
                        <Card variant="outlined" className={classes.labelCard}>
                            <CardActionArea onClick={(e) => navigateToLabel(e)} className={classes.centerContent}>
                                <CardContent className={classes.centerContent}>
                                    <Typography variant="h2">
                                        ~{label.labelName}~
                                    </Typography>
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    </GridListTile>
                })}
            </GridList>
            :
            <div className={classes.emptyDiv}>
                <h3>{"There don't seem to be any labels here :-("}</h3>
            </div>
            }
            {data && data.labelsForUser.hasMore ? 
            <div className={classes.loadMoreContainer}>
                <Button variant="contained" className={classes.button} component="label" key="load-more-images-button" onClick={() => fetchMoreEntities(fetchMore, "labelsForUser", data, 3, null)}>
                    { loading ? "Loading..." : "Load More" }
                </Button>
            </div>
            :
            null}
        </div>
        
    );
}

export default Labels;