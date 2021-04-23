import {
    Link,
    Switch,
    Route,
    Nav,
    NavLink,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Labels from './Labels/Labels';
import Settings from './Settings/Settings';
import UploadedImages from './UploadedImages/UploadedImages';
import SavedImages from './SavedImages/SavedImages';
import Navigation from '../Navigation/Navigation';
import Upload from './Upload/Upload';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        margin: '20px',
        fontFamily: theme.typography.fontFamily,
    },
    username: {
        fontSize: '60px',
        fontWeight: '800',
        marginTop: '20px'
    },
    profileOptions: {
        listStyleType: 'none',
        padding: '0',
        marginLeft: '6px',
        '& li': {
            display: 'inline-block',
            marginRight: '20px',
            color: theme.palette.common.black
        }
    },
    divider: {
        marginTop: '12px',
        width: '300px',
        marginLeft: '0px'
    },
    selectedOption: {
        fontWeight: '800'
    },
    optionUrl: {
        textDecoration: 'none',
        fontSize: '22px',
        color: 'black',
    }
}));

function getProfileOption(cssClasses, optionUrl, optionName){
    return <NavLink exact className={cssClasses.optionUrl} activeClassName={cssClasses.selectedOption} to={optionUrl}> {optionName} </NavLink>
}

function User(){
    const classes = useStyles();
    const [labelSearch, setLabelSearch] = useState("");
    
    const { username } = useParams();
    const match = useRouteMatch();

    return (
        <div>            
            <Navigation />
                <div className={classes.mainContainer}>
                    <div className={classes.username}>{username}</div>

                    <ul className={classes.profileOptions}>
                        <li>
                            {getProfileOption(classes, match.url, "Images")}
                        </li>
                        <li>
                            {getProfileOption(classes, `${match.url}/labels`, "Labels")}
                        </li>
                        <li>
                            {getProfileOption(classes, `${match.url}/upload`, "Upload")}
                        </li>
                    </ul> 

                    <TextField label="Search by Label" variant="outlined" onChange={(e) => setLabelSearch(e.target.value)}/>
                    
                    <hr className={classes.divider}/>

                    <Switch>
                        <Route path={`${match.path}/labels/:labelName`}>
                            <SavedImages />
                        </Route>
                        <Route path={`${match.path}/labels`}>
                            <Labels toSearch={labelSearch} />
                        </Route>
                        <Route path={`${match.path}/settings`}>
                            <Settings />
                        </Route>
                        <Route path={`${match.path}/upload`}>
                            <Upload />
                        </Route>
                        <Route exact path={match.path}>
                            <UploadedImages toSearch={labelSearch}/>
                        </Route>
                    </Switch>
            </div>
        </div>
    );
}

export default User;