import { 
    Link, 
    Switch,
    Route,
    useRouteMatch, 
    useParams 
} from 'react-router-dom';
import { labels } from '../../TempData/TempData';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

function Labels({ toSearch }){
    const { username } = useParams();
    const match = useRouteMatch();

    return (
        <div>
            <GridList cellHeight={350} cellWidth={400} cols={3}>
                {labels
                .filter(label => label.startsWith(toSearch))
                .map((label) => {
                    return <GridListTile>
                        <b>~{label}~</b>
                    </GridListTile>
                })}
            </GridList>
        </div>
        
    );
}

export default Labels;