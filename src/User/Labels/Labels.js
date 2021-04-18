import { 
    Link, 
    Switch,
    Route,
    useRouteMatch, 
    useParams 
} from 'react-router-dom';

function Labels(){
    const { username } = useParams();
    const match = useRouteMatch();

    return (
        <div>
            <h1>Labels for {username} </h1>

            <ul>
                <li>
                    <Link to={`${match.url}/label1`}> Label 1 </Link>
                </li>
                <li>
                    <Link to={`${match.url}/label2`}> Label 2 </Link>
                </li>
            </ul>

        </div>
        
    );
}

export default Labels;