import { useParams } from 'react-router-dom';

function Labels(){
    const { username } = useParams();

    return <h1>Labels for {username} </h1>;
}

export default Labels;