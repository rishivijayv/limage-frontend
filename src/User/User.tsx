
import {
    Switch,
    Route,
    useRouteMatch,
} from 'react-router-dom';
import Labels from './Labels/Labels';
import SavedImages from './SavedImages/SavedImages';
import Upload from './Upload/Upload';
import UploadedImages from './UploadedImages/UploadedImages';
import Heading from '../Utilities/Heading';
import { useMeQuery } from '../generated/graphql';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    userContainer: {
        margin: '40px'
    },
});

function User(){
    const classes = useStyles();
    const match = useRouteMatch();
    const { loading, data } = useMeQuery();
    

    let username;
    if(loading){
        return <h1>Loading...</h1>
    }
    if(!loading && !data?.me){
        return <h1> You are not logged in</h1>
    }else{
        username = data?.me?.username;
    }

    const userHeadingLinks= [
        {
            url: match.url,
            display: "Images"
        },
        {
            url: `${match.url}/labels`,
            display: "Labels"
        },
        {
            url: `${match.url}/upload`,
            display: "Upload"
        }
    ];

    return (           
        <div>
            <div className={classes.userContainer}>
                <Heading title={username!} links={userHeadingLinks} />
                <Switch>
                    <Route path={`${match.path}/labels/:labelName`}>
                        <SavedImages />
                    </Route>
                    <Route path={`${match.path}/labels`}>
                        <Labels />
                    </Route>
                    <Route path={`${match.path}/upload`}>
                        <Upload />
                    </Route>
                    <Route exact path={match.path}>
                        <UploadedImages/>
                    </Route>
                </Switch>
            </div>
        </div>

    );
}

export default User;