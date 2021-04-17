import { Link, useParams, useRouteMatch } from 'react-router-dom';

function Home(){
    const { username } = useParams();
    const match = useRouteMatch();

    return (
        <div>
            <h1>Home for {username}</h1>
            <ul>
                <li>
                    <Link to={`${match.url}/labels`}> Labels </Link>
                </li>
                <li>
                    <Link to={`${match.url}/settings`}> Settings </Link>
                </li>
            </ul>    
        </div>
    );
}

export default Home;